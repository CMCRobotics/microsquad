// 
// 
// 
// 
// 
// 
// 

import { HomieDevice, HomieNode, HomieProperty } from "node-homie";
import { HOMIE_TYPE_COLOR, HOMIE_TYPE_STRING, HomieNodeAtrributes } from "node-homie/model";


export class NodeTeam extends HomieNode {
    constructor(device: HomieDevice, attrs: HomieNodeAtrributes) {
        attrs.type = "team";
        super(device, attrs);

        this.add(new HomieProperty(this, { id:"nickname" , name:"Nickname", datatype: HOMIE_TYPE_STRING }))
        this.add(new HomieProperty(this, { id:"players"  , name:"Players", datatype: HOMIE_TYPE_STRING }))
        this.add(new HomieProperty(this, { id:"color", name:"Color", datatype: HOMIE_TYPE_COLOR })) 
    }
}
