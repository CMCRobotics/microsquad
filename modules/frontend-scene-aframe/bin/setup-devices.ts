#!/usr/bin/env ts-node
'use strict';

import { connect } from "mqtt";
import {HomieProperty, HomieNode, HomieDevice} from "node-homie"
import { HOMIE_TYPE_STRING } from "node-homie/model";

import {DeviceGateway} from "../src/homie/gateway"
console.log(`Setup devices and properties for testing`);


const gatewayDevice = new DeviceGateway({ id: 'gateway', name: 'MicroSquad Gateway' }, {
    url: 'mqtt://localhost:1883',
    topicRoot: 'microsquad' 
});

// const scoreboardNode = gatewayDevice.add(new HomieNode(gatewayDevice, { id: 'scoreboard', name: 'Scoreboard', type: 'scoreboard' }));

// scoreboardNode.add(new HomieProperty(scoreboardNode, {id: 'score',name: 'Score',datatype: HOMIE_TYPE_STRING, settable: true}));
// scoreboardNode.add(new HomieProperty(scoreboardNode, {id: 'image',name: 'Image',datatype: HOMIE_TYPE_STRING}));
// scoreboardNode.add(new HomieProperty(scoreboardNode, {id: 'sound',name: 'Sound',datatype: HOMIE_TYPE_STRING}));
// scoreboardNode.add(new HomieProperty(scoreboardNode, {id: 'show',name: 'Show',datatype: HOMIE_TYPE_STRING}));

// const gameNode = gatewayDevice.add(new HomieNode(gatewayDevice, {id: 'game', name:'Game', type: 'game'}));
// gameNode.add(new HomieProperty(gameNode, {id: 'name',name: 'Name',datatype: HOMIE_TYPE_STRING}))
// gameNode.add(new HomieProperty(gameNode, {id: 'game-status',name: 'Game Status',datatype: HOMIE_TYPE_STRING}))
// gameNode.add(new HomieProperty(gameNode, {id: 'transitions',name: 'Transitions',datatype: HOMIE_TYPE_STRING}))
// gameNode.add(new HomieProperty(gameNode, {id: 'fire-transition',name: "The transition fired to further the game's progression",datatype: HOMIE_TYPE_STRING}))
// gameNode.add(new HomieProperty(gameNode, {id: 'broadcast',name: 'Broadcast',datatype: HOMIE_TYPE_STRING}))

gatewayDevice.onInit();

console.log('Declared devices...');


const client = connect('mqtt://localhost')
client.publish('microsquad/gateway/scoreboard/score', 'gros')
console.log('Updated property...')

setTimeout(async () => {
    console.log('Exiting application')
    await gatewayDevice.onDestroy();
    console.log('Exited')
    client.end()
}, 3000);