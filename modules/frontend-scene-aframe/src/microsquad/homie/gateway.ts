import { HomieDevice, HomieNode, HomieProperty } from "node-homie";
import { HOMIE_TYPE_STRING, HomieDeviceAtrributes, HomieDeviceMode, MQTTConnectOpts } from "node-homie/model";
import { RxMqtt } from "node-homie/mqtt";

/**
 * A Homie Device class for the MicroSquad Gateway.
 * It exposes the following nodes :
 *   * scoreboard
 *   * game
 * 
 * Also centralizes terminal and game management methods, and corresponding emits MicroSquad events.
 * 
 * 
 * @see MicroSquadEvent
 */
export class DeviceGateway extends HomieDevice{

    scoreboardNode?: HomieNode;
    gameNode?: HomieNode;

    constructor(attrs: HomieDeviceAtrributes, mqttOptions: MQTTConnectOpts | RxMqtt, mode?: HomieDeviceMode | undefined){
        super(attrs, mqttOptions, mode);
        this.scoreboardNode = this.add(new HomieNode(this, { id: 'scoreboard', name: 'Scoreboard', type: 'scoreboard' }));

        this.scoreboardNode.add(new HomieProperty(this.scoreboardNode, {id: 'score',name: 'Score',datatype: HOMIE_TYPE_STRING, settable: true}));
        this.scoreboardNode.add(new HomieProperty(this.scoreboardNode, {id: 'image',name: 'Image',datatype: HOMIE_TYPE_STRING}));
        this.scoreboardNode.add(new HomieProperty(this.scoreboardNode, {id: 'sound',name: 'Sound',datatype: HOMIE_TYPE_STRING}));
        this.scoreboardNode.add(new HomieProperty(this.scoreboardNode, {id: 'show',name: 'Show',datatype: HOMIE_TYPE_STRING}));

        this.gameNode = this.add(new HomieNode(this, {id: 'game', name:'Game', type: 'game'}));

        this.gameNode.add(new HomieProperty(this.gameNode, {id: 'name',name: 'Name',datatype: HOMIE_TYPE_STRING}))
        this.gameNode.add(new HomieProperty(this.gameNode, {id: 'game-status',name: 'Game Status',datatype: HOMIE_TYPE_STRING}))
        this.gameNode.add(new HomieProperty(this.gameNode, {id: 'transitions',name: 'Transitions',datatype: HOMIE_TYPE_STRING}))
        this.gameNode.add(new HomieProperty(this.gameNode, {id: 'fire-transition',name: "The transition fired to further the game's progression",datatype: HOMIE_TYPE_STRING}))
        this.gameNode.add(new HomieProperty(this.gameNode, {id: 'broadcast',name: 'Broadcast',datatype: HOMIE_TYPE_STRING}))
    }
}


