import { HomieDevice, HomieNode, HomieProperty } from "node-homie";
import { HOMIE_TYPE_COLOR, HOMIE_TYPE_DATETIME, HOMIE_TYPE_DURATION, HOMIE_TYPE_FLOAT, HOMIE_TYPE_STRING, HomieNodeAtrributes } from "node-homie/model";


export class NodePlayer extends HomieNode {
    constructor(device: HomieDevice, attrs: HomieNodeAtrributes) {
        attrs.type = "player";
        super(device, attrs);
        this.add(new HomieProperty(this, { id: "nickname", name: "Nickname", datatype: HOMIE_TYPE_STRING }));
        this.add(new HomieProperty(this, { id: "skin", name: "skin", datatype: HOMIE_TYPE_STRING }));
        this.add(new HomieProperty(this, { id: "order", name: "Order", datatype: HOMIE_TYPE_STRING, settable: true }));
        this.add(new HomieProperty(this, { id:"color", name:"Color", datatype: HOMIE_TYPE_COLOR })) 
        const scaleProp = this.add(new HomieProperty(this, { id: "Scale", name: "Scale", datatype: HOMIE_TYPE_FLOAT }));
        scaleProp.value = String("1.0");
        const rotationProp = this.add(new HomieProperty(this, { id: "Rotation", name: "Rotation" }));
        rotationProp.value = String("1.0");
        this.add(new HomieProperty(this, { id: "say", name: "Say", datatype: HOMIE_TYPE_STRING }));
        this.add(new HomieProperty(this, { id: "say-start", name: "Say start", datatype: HOMIE_TYPE_DATETIME }));
        this.add(new HomieProperty(this, { id: "say-duration", name: "Say duration", datatype: HOMIE_TYPE_DURATION }));
        this.add(new HomieProperty(this, { id: "animation", name: "Animation", datatype: HOMIE_TYPE_STRING, retained: false }));
        this.add(new HomieProperty(this, { id: "animation-start", name: "Animation start", datatype: HOMIE_TYPE_DATETIME }));
        this.add(new HomieProperty(this, { id: "animation-duration", name: "Animation duration", datatype: HOMIE_TYPE_DURATION, settable: false }));
        this.add(new HomieProperty(this, { id: "accessory", name: "Accessory", datatype: HOMIE_TYPE_STRING }));
        this.add(new HomieProperty(this, { id: "terminal-id", name: "Terminal id", datatype: HOMIE_TYPE_STRING }));
    }
}
