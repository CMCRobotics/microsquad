import Aedes from "aedes";
import { createServer, Server } from 'aedes-server-factory';

import {DeviceGateway} from "../src/microsquad/homie/gateway"
import {DeviceTerminal} from "../src/microsquad/homie/terminal"

import {MicroSquadEventType} from '../src/microsquad/event'
import assert, { AssertionError, equal, ok } from "assert";

import {AsyncClient, connect} from 'async-mqtt';
import { MQTTConnectOpts } from "node-homie/model";
import { AddressInfo } from "net";
import { DeviceDiscovery, HomieDeviceManager } from "node-homie";
import { Controller } from "../src/microsquad/controller";

import {Observer, Subject} from "rxjs";
import { MicroSquadEvent } from "../src/microsquad/event";

describe('Microsquad integration tests', () => {
    let gatewayDevice : DeviceGateway;
    let aedes : Aedes;
    let server: Server;
    let port: number;
    let mqtt_opts : MQTTConnectOpts = { url: '' , topicRoot: 'microsquad'};
    let deviceManager = new HomieDeviceManager();


    beforeAll((done) =>{ 
        aedes = new Aedes()
        // Create a new Aedes server instance and start listening on a random port
        server = createServer(aedes);
          server.listen(0, function (){
              port = (server.address() as AddressInfo).port;
              console.debug(`Running MQTT broker on port ${port}`);
              mqtt_opts.url=`mqtt://localhost:${port}`;
              gatewayDevice = new DeviceGateway({ id: 'gateway', name: 'MicroSquad Gateway' },mqtt_opts);
              deviceManager.add(gatewayDevice);
            done();
          });
        
    });

    describe('Basic MQTT and device tests',() =>{

        it('should receive a message when the gateway changes state', (done) => {
            const client : AsyncClient = connect(`tcp://localhost:${port}`);
            const STATE_TOPIC  = "microsquad/gateway/$state"
            client.on("message", (topic) =>{
                equal(topic,STATE_TOPIC );
                client.end().then(done);
            });
            client.subscribe(STATE_TOPIC).then( ()=> {
                gatewayDevice.onInit();
            });
        });

        it('should create a terminal device', (done) => {
            const client : AsyncClient = connect(`tcp://localhost:${port}`);
            const STATE_TOPIC  = "microsquad/terminal-1/$state"
            let terminal1 = new DeviceTerminal({id: 'terminal-1', name: "Terminal 1"}, mqtt_opts);
            client.on("message", (topic) =>{
                equal(topic,STATE_TOPIC );
                client.end().then(done);
            });
            client.subscribe(STATE_TOPIC).then( ()=> {
                terminal1.onInit();
            });
        });

        it('should refuse to create a terminal device with improper id', () => {
            const client : AsyncClient = connect(`tcp://localhost:${port}`);
            expect( () => {
                let terminal1 = new DeviceTerminal({id: 'some-random-name-1', name: "Random Terminal 1"}, mqtt_opts);
            }).toThrow(AssertionError);
            client.end();
        });
    });


    
    describe('Controller tests',() =>{
        let terminal1 : DeviceTerminal; 
        let subject = new Subject<MicroSquadEvent>();
        let controller : Controller;

        it('should receive a MicroSquad event when a terminal receives a command', (done)=>{
            
            const client : AsyncClient = connect(`tcp://localhost:${port}`);
            
            const tester : Partial<Observer<MicroSquadEvent>> = {
                next: (event) =>{
                    console.log(`*** Received event ${event.type} for ${event.deviceId}`, event)
                    if(event.type == 'terminal_discovered'){
                        client.publish("microsquad/terminal-1/info/command", "your wish");
                    }
                    // TODO : Add a check that the command "your wish" is actually received
                    //        Currently, only "null" is being received.
                    if(event.type == 'terminal_command' && event.payload){
                        console.log("received payload ", event.payload);
                        client.end(true).then( () => {
                            console.log("Closed asyncClient");
                            done();
                        });
                    }
                }
            }
            subject.subscribe(tester);
            controller = new Controller(mqtt_opts,subject);
            controller.onInit().then( async() => {
                terminal1 = new DeviceTerminal({id: 'terminal-1', name: "Terminal 1"}, mqtt_opts);
                await terminal1.onInit();
                console.log("Declared terminal");
            });
            
        }, 8000);
        afterEach(() => {
            terminal1?.onDestroy();
            controller?.onDestroy();
        });
    });

    afterAll((done) => {
        gatewayDevice?.onDestroy();
        deviceManager.destroyAllDevices().then( () => {
            server?.close();
            aedes?.close(done);
        });
        
    });

        
});

