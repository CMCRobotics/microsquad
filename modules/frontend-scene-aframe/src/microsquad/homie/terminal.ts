import { HomieDevice, HomieNode, HomieProperty } from "node-homie";
import { HOMIE_TYPE_DATETIME, HOMIE_TYPE_FLOAT, HOMIE_TYPE_INT, HOMIE_TYPE_STRING, HomieDeviceAtrributes, HomieDeviceMode, HomieNodeAtrributes, MQTTConnectOpts, notNullish } from "node-homie/model";
import { RxMqtt } from "node-homie/mqtt";
import assert from "node:assert";

/**
 * A Homie Device class for a MicroSquad Terminal.
 * A ``terminal`` is an appliance of intentionally limited capacity that lets a player participate in a game.
 * The appliance can be as simple as a micro-controller with buttons and a basic display (e.g. a Micro:bit),
 *  or even a mobile phone with a simple onboard user interface.
 * 
 * @see MicroSquadEvent
 */
export class DeviceTerminal extends HomieDevice{
    
    buttonANode?: HomieNode;
    buttonBNode?: HomieNode;
    acceleratorNode?: HomieNode;
    displayNode?: HomieNode;
    environmentNode?: HomieNode;
    voteNode?: HomieNode;
    infoNode?: HomieNode;

    constructor(attrs: HomieDeviceAtrributes, mqttOptions: MQTTConnectOpts | RxMqtt, mode?: HomieDeviceMode | undefined){
        assert(attrs.id.startsWith('terminal-'), "Terminal device id must imperatively start with 'terminal-'");
        super(attrs, mqttOptions, mode);
        this.buttonANode = this.add(new NodeButton(this, { id: 'button-a', name: 'Button A' }));
        this.buttonBNode = this.add(new NodeButton(this, { id: 'button-b', name: 'Button B' }));
        this.acceleratorNode = this.add(new NodeAccelerator(this, {id: 'accel', name:'Accelerator'}));
        this.environmentNode = this.add(new NodeEnvironment(this, {id: 'environment', name:'Environment'}));
        this.displayNode = this.add(new NodeDisplay(this, {id: 'display', name:'Display'}));
        this.infoNode = this.add(new NodeInfo(this, {id: 'info', name:'Info'}));
        this.voteNode = this.add(new NodeVote(this, {id: 'vote', name:'Vote'}));
    }
}

class NodeButton extends HomieNode{
    constructor(device: HomieDevice, attrs: HomieNodeAtrributes){
        attrs.type="button";
        super(device,attrs);
        const pressedProp = this.add(new HomieProperty(this, {id: 'pressed',name: 'Pressed',datatype: HOMIE_TYPE_INT}))
        const countProp = this.add(new HomieProperty(this, {id: 'count',name: 'Pressed Count',datatype: HOMIE_TYPE_INT}))
        this.add(new HomieProperty(this, {id: 'last',name: 'Last pressed timestamp',datatype: HOMIE_TYPE_DATETIME}))
        pressedProp.value = String(0);
        countProp.value = String(0);
    }
}


class NodeDisplay extends HomieNode{
    constructor(device: HomieDevice, attrs: HomieNodeAtrributes){
        attrs.type="display";
        super(device,attrs);
        this.add(new HomieProperty(this, {id: 'contents',name: 'Contents',datatype: HOMIE_TYPE_STRING}))
        this.add(new HomieProperty(this, {id: 'luminosity',name: 'Luminosity percent',unit: "%", datatype: HOMIE_TYPE_INT}))
    }
}

class NodeAccelerator extends HomieNode{
    constructor(device: HomieDevice, attrs: HomieNodeAtrributes){
        attrs.type="accelerator";
        super(device,attrs);
        this.add(new HomieProperty(this, {id: 'x',name: 'X',datatype: HOMIE_TYPE_INT}))
        this.add(new HomieProperty(this, {id: 'y',name: 'Y',datatype: HOMIE_TYPE_INT}))
        this.add(new HomieProperty(this, {id: 'z',name: 'Z',datatype: HOMIE_TYPE_INT}))
        this.add(new HomieProperty(this, {id: 'value',name: 'Value',datatype: HOMIE_TYPE_STRING}))
    }
}

class NodeInfo extends HomieNode{
    constructor(device: HomieDevice, attrs: HomieNodeAtrributes){
        attrs.type="info";
        super(device,attrs);
        this.add(new HomieProperty(this, {id: "terminal-id"  , name:"Terminal ID", datatype: HOMIE_TYPE_STRING}))
        this.add(new HomieProperty(this, {id: "serial-number", name:"Serial Number", datatype: HOMIE_TYPE_STRING}))
        this.add(new HomieProperty(this, {id: "heartbeat"    , name:"Heartbeat", datatype: HOMIE_TYPE_DATETIME}))
        const commandProp = this.add(new HomieProperty(this, {id: "command"      , name:"Command", datatype: HOMIE_TYPE_STRING, settable:true, retained: true}))
        commandProp.value = "none";
      }
}

class NodeVote extends HomieNode{
    constructor(device: HomieDevice, attrs: HomieNodeAtrributes){
        attrs.type="vote";
        super(device,attrs);
        this.add(new HomieProperty(this, {id: "value"  , name:"Choice value", datatype: HOMIE_TYPE_STRING}))
        this.add(new HomieProperty(this, {id: "index", name:"Choice index", datatype: HOMIE_TYPE_INT}))
        this.add(new HomieProperty(this, {id: "last"    , name:"Last vote timestamp", datatype: HOMIE_TYPE_DATETIME}))
      }
}

class NodeEnvironment extends HomieNode{
    constructor(device: HomieDevice, attrs: HomieNodeAtrributes, unit = "°C"){
        attrs.type="environment";
        super(device,attrs);
        this.add(new HomieProperty(this, {id: "temperature"  , name:"Temperature", unit: unit, datatype: HOMIE_TYPE_FLOAT}))
      }
}



