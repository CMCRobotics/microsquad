import { MQTTConnectOpts } from "node-homie/model";
import { Observer, Subject, takeUntil } from "rxjs";
import { MicroSquadEvent, MicroSquadEventType, ofDevice } from "./event";
import { DeviceDiscovery, DiscoveryEvent, HomieDevice, HomieDeviceManager } from "node-homie";

import {SimpleLogger, LogLevels } from 'node-homie/misc';
import { log } from "console";

/**
 * A Controller instance watching Homie discovery or update events and transforms them
 * to higher-level order events (MicroSquadEvent), to forward them to the given Observable event source.
 * 
 * @see MicroSquadEvent
 * @see Observable
 */
export class Controller{
    mqttOptions: MQTTConnectOpts;
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
                        this.eventSource?.next(new MicroSquadEvent((event.type==='add'?'terminal_discovered':'terminal_removed'),event.deviceId));
                    }
                    break;
                case "error":
                    this.log.error('Device discovery error : '+event.error);
                    break;
            }

        }
    }
    

    constructor(mqttOptions: MQTTConnectOpts, eventSource?: Observer<MicroSquadEvent>){
        this.mqttOptions = mqttOptions;
        this.eventSource = eventSource;

        this.deviceDiscovery = new DeviceDiscovery(mqttOptions);
        this.deviceDiscovery.events$.pipe(
            // unsubscribe on application exit
            takeUntil(this.onDestroy$)
        ).subscribe(this.discoveryObserver);

        this.deviceManager = new HomieDeviceManager();
        this.log = new SimpleLogger(this.constructor.name, "controller", "microsquad" );
    }

    onInit(): void {
        // TODO : Register for discovery and update events to aggregate them
        this.deviceDiscovery.onInit();
    }
}