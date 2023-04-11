import { MQTTConnectOpts } from "node-homie/model";
import { RxMqtt } from "node-homie/mqtt";
import { Observable } from "rxjs";
import { MicroSquadEvent, MicroSquadEventType } from "../microsquad/event";

/**
 * A Controller instance watching Homie discovery or update events and transforms them
 * to higher-level order events (MicroSquadEvent), to forward them to the given Observable event source.
 * 
 * @see MicroSquadEvent
 * @see Observable
 */
export class Controller{
    mqttOptions: MQTTConnectOpts | RxMqtt;
    eventSource?: Observable<MicroSquadEvent<MicroSquadEventType>>;

    constructor(mqttOptions: MQTTConnectOpts | RxMqtt, eventSource?: Observable<MicroSquadEvent<MicroSquadEventType>>){
        this.mqttOptions = mqttOptions;
        this.eventSource = eventSource;
    }

    onInit(): void {
        
    }
}