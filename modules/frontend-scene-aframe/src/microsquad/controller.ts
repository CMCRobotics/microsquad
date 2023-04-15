import { Observer, Observable, Subject, takeUntil, map, filter, distinctUntilChanged } from "rxjs";

import { MicroSquadEvent, MicroSquadEventType, ofNode, ofProperty } from "./event";
import { DeviceDiscovery, DiscoveryEvent, HomieDevice, HomieDeviceManager, HomieProperty } from "node-homie";
import { notNullish } from 'node-homie/model'
import { SimpleLogger } from 'node-homie/misc';
import { watchList } from 'node-homie/rx';

/**
 * A Controller instance watching Homie discovery or update events and transforms them
 * to higher-level order events (MicroSquadEvent), to forward them to the given Observer.
 * 
 * @see MicroSquadEvent
 * @see Observer
 */
export class Controller{
    eventSource?: Observer<MicroSquadEvent>;
    deviceDiscovery: DeviceDiscovery;
    deviceManager: HomieDeviceManager;
    onDestroy$ = new Subject<boolean>();
    readonly log: SimpleLogger;

    discoveryObserver : Partial<Observer<DiscoveryEvent>> = {
        next: (event) => { 
            switch(event.type){
                case "add":
                case "remove":
                    let device : HomieDevice | undefined = this.deviceManager.getDevice(event.deviceId);
                    if(device?.attributes.name?.startsWith("terminal-")){
                        this.log.debug(event.type.toUpperCase+' Terminal device '+event.deviceId);
                        this.eventSource?.next(new MicroSquadEvent((event.type==='add'?'terminal_discovered':'terminal_removed'),event.deviceId));
                    }
                    break;
                case "error":
                    this.log.error('Device discovery error : '+event.error);
                    break;
            }

        }
    }
    

    constructor(deviceDiscovery: DeviceDiscovery, eventSource?: Observer<MicroSquadEvent>){
        this.eventSource = eventSource;

        this.deviceDiscovery = deviceDiscovery;
        this.deviceDiscovery.events$.pipe(takeUntil(this.onDestroy$))
                                    .subscribe(this.discoveryObserver);

        this.deviceManager = new HomieDeviceManager();

        this.registerGameDiscoveryQuery();
        this.registerPlayerDiscoveryQuery();
        this.registerTerminalCommandQuery();
        this.log = new SimpleLogger(this.constructor.name, "controller", "microsquad" );
    }

    private registerGameDiscoveryQuery() {
        this.deviceManager.query({ node: { id: 'game' }, property: { name: 'name' } }).pipe(
             takeUntil(this.onDestroy$)
            ,filter(props => props.length > 0)
            ,watchList(prop => prop.value$.pipe(
                filter(notNullish),
                distinctUntilChanged()
            ))).subscribe({
                next: propertyList => {
                    propertyList.forEach(p => {
                        let verb = 'discovered'
                        if(p.value == undefined || p.value == ''){
                            verb = 'removed'
                        }
                        if(p.value){
                          this.log.debug(p.value?.toUpperCase+' game '+verb);
                        } 
                        this.eventSource?.next(ofProperty(('game_'+verb as MicroSquadEventType), p));
                    });
                }
            });
    }

    private registerPlayerDiscoveryQuery() {
        this.deviceManager.query({
            node: { type: 'player' }, property: { name: 'terminal-id' }
        }).pipe(
            takeUntil(this.onDestroy$)
            , filter(props => props.length > 0)
            , watchList(prop => prop.value$.pipe(
                filter(notNullish),
                distinctUntilChanged()))
        ).subscribe({
            next: propertyList => {
                propertyList.forEach(playerId => {
                    this.log.debug('Discovered Player id : '+playerId.value);
                    this.eventSource?.next(ofNode('player_discovered', playerId.node));
                });
            }
        })
    }

    private registerTerminalCommandQuery() {
        this.deviceManager.query({
            node: { type: 'info' }, property: { name: 'command' }
        }).pipe(
            takeUntil(this.onDestroy$)
            ,map((props: HomieProperty[]) => props.filter((prop: HomieProperty) => prop.device.id.startsWith('terminal-')))
            ,filter(props => props.length > 0)
            ,watchList(prop => prop.value$.pipe(
                filter(notNullish),
                distinctUntilChanged()))
        ).subscribe({
            next: propertyList => {
                propertyList.forEach(prop => {
                    this.log.debug(`Terminal ${prop.device.id} received command ${prop.value}`);
                    this.eventSource?.next(ofProperty('terminal_command', prop));
                });
            }
        })
    }
}
