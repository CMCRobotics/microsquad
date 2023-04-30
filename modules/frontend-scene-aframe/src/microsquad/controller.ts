import { Observer, Subject, takeUntil, map, filter, distinctUntilChanged, Observable } from "rxjs";

import { MicroSquadEvent, MicroSquadEventType, ofNode, ofProperty } from "./event";
import { DeviceDiscovery, DiscoveryEvent, HomieDevice, HomieDeviceManager, HomieProperty } from "node-homie";
import { MQTTConnectOpts, notNullish } from 'node-homie/model'
import { LifecycleBase, SimpleLogger } from 'node-homie/misc';
import { watchList } from 'node-homie/rx';

/**
 * A Controller instance watching Homie discovery or update events and transforms them
 * to higher-level order events (MicroSquadEvent), to forward them to the given Observer.
 * 
 * @see MicroSquadEvent
 * @see Observer
 */
export class Controller extends LifecycleBase{
    eventSource?: Observer<MicroSquadEvent>;
    deviceDiscovery: DeviceDiscovery;
    deviceManager: HomieDeviceManager;
    mqtt_opts : MQTTConnectOpts;
    onDestroySubj$ = new Subject<boolean>();
    readonly log: SimpleLogger;

    private readonly discoveryEventHandler: Partial<Observer<DiscoveryEvent>> | undefined = {
        next: event => {
            // Handle device addition and removal first
            switch (event.type) {
                case "add":
                    if (!this.deviceManager.hasDevice(event.deviceId)) {
                        const newDevice = this.deviceManager.add(event.makeDevice());
                        this.log.warn(`Added device ${newDevice.id} to device manager`);
                    }
                    break;
                case "remove":
                    const device = this.deviceManager.removeDevice(event.deviceId);
                    if (device) {
                        device.onDestroy();
                        this.log.debug(`Removed device ${device.id} from device manager`);
                    }
                    break;
            }
            // Emit any higher-level Microsquad event  as required
            switch (event.type) {
                case "add":
                case "remove":
                    let device: HomieDevice | undefined = this.deviceManager.getDevice(event.deviceId);

                    if (device?.id.startsWith("terminal-")) {
                        this.log.debug(`${event.type} Terminal device ${event.deviceId}`);
                        this.eventSource?.next(new MicroSquadEvent((event.type === 'add' ? 'terminal_discovered' : 'terminal_removed'), event.deviceId));
                    }
                    break;
                case "error":
                    this.log.error('Device discovery error : ' + event.error);
                    break;
            }
        }
    };

    constructor(mqtt_opts: MQTTConnectOpts, eventSource?: Observer<MicroSquadEvent>){
        super();
        this.mqtt_opts = mqtt_opts;
        this.eventSource = eventSource;
        this.deviceManager = new HomieDeviceManager();

        this.deviceDiscovery = new DeviceDiscovery(this.mqtt_opts);
        // this.deviceDiscovery.events$.pipe(takeUntil(super._onDestroy$))
        this.deviceDiscovery.events$.pipe(takeUntil(this.onDestroySubj$))
                                    .subscribe(this.discoveryEventHandler);
                                    
                                    
        // this.registerGameDiscoveryQuery();
        // this.registerPlayerDiscoveryQuery();
        this.registerTerminalCommandQuery();
        this.log = new SimpleLogger(this.constructor.name, "controller", "microsquad" );
    }
    onInit(): Promise<void> {
        return this.deviceDiscovery.onInit();
    }

    onDestroy(): Promise<void> {
        this.onDestroySubj$.next(true);
        this.deviceDiscovery.onDestroy();
        return super.onDestroy();
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
            // ,map((props: HomieProperty[]) => props.filter((prop: HomieProperty) => prop.device.id.startsWith('terminal-')))
            // ,filter(props => props.length > 0)
            // ,watchList(prop => prop.value$.pipe(
            //     filter(notNullish),
            //     distinctUntilChanged()))
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
