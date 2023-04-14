#!/usr/bin/env ts-node
'use strict';

import { connect } from "mqtt";
import {HomieProperty, HomieNode, HomieDevice} from "node-homie"
import { HOMIE_TYPE_STRING } from "node-homie/model";

import {DeviceGateway} from "../src/microsquad/homie/gateway"
console.log(`Setup devices and properties for testing`);


const gatewayDevice = new DeviceGateway({ id: 'gateway', name: 'MicroSquad Gateway' }, {
    url: 'mqtt://localhost:1883',
    topicRoot: 'microsquad' 
});


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