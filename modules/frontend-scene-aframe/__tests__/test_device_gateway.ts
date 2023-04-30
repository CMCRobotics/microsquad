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

    it.skip('should receive a message published to a state topic', (done) => {
        const client : AsyncClient = connect(`tcp://localhost:${port}`);
        const STATE_TOPIC  = "microsquad/gateway/$state"
        client.on("message", (topic, message) =>{
            equal(topic,STATE_TOPIC );
            client.end().then(done);
        });
        client.subscribe(STATE_TOPIC).then( ()=> {
            gatewayDevice.onInit();
        });
    });

    it.skip('should create a terminal device', (done) => {
        const client : AsyncClient = connect(`tcp://localhost:${port}`);
        const STATE_TOPIC  = "microsquad/terminal-1/$state"
        let terminal1 = new DeviceTerminal({id: 'terminal-1', name: "Terminal 1"}, mqtt_opts);
        client.on("message", (topic, message) =>{
            equal(topic,STATE_TOPIC );
            client.end().then(done);
        });
        client.subscribe(STATE_TOPIC).then( ()=> {
            terminal1.onInit();
        });
    });

    it('should refuse to create a terminal device with improper id', () => {
        expect( () => {
            const client : AsyncClient = connect(`tcp://localhost:${port}`);
            let terminal1 = new DeviceTerminal({id: 'some-random-name-1', name: "Random Terminal 1"}, mqtt_opts);
        }).toThrow(AssertionError);
    });


    
    describe('Controller tests',() =>{
        let terminal1 : DeviceTerminal; 
        let subject = new Subject<MicroSquadEvent>();
        let controller : Controller;

        test('should discover a new Terminal', (done)=>{
            terminal1 = new DeviceTerminal({id: 'terminal-1', name: "Terminal 1"}, mqtt_opts);
            terminal1.onInit();
            const tester : Partial<Observer<MicroSquadEvent>> = {
                next: (event) =>{
                    equal("terminal-1",event.deviceId)
                    equal('terminal_discovered',event.type)
                    done();
                }
            }
            subject.subscribe(tester);
            controller = new Controller(mqtt_opts,subject);
            controller.onInit();
            
        });

        test('should receive command event when a Terminal receives a command', (done)=>{
            terminal1 = new DeviceTerminal({id: 'terminal-1', name: "Terminal 1"}, mqtt_opts);
            terminal1.onInit();
            const client : AsyncClient = connect(`tcp://localhost:${port}`);
            
            const tester : Partial<Observer<MicroSquadEvent>> = {
                next: (event) =>{
                    if(event.type == 'terminal_command'){
                        equal(event.deviceId, "terminal-1");
                        equal(event.payload, 'your wish');
                        client.end();
                        done();
                    }
                }
            }
            subject.subscribe(tester);
            controller = new Controller(mqtt_opts,subject);
            controller.onInit().then( () => {
                client.publish("microsquad/terminal-1/info/command", "your wish")
            });
            
        });
        afterEach(() => {
            terminal1?.onDestroy();
            controller?.onDestroy();
        });
    });

    // it('should emit a COMMAND Microsquad event when a terminal receives a command', (done) => {
    //     let terminal1 = new DeviceTerminal({id: 'terminal-1', name: "Terminal 1"}, mqttopts);
    //     let deviceDiscovery  = new DeviceDiscovery(mqttopts);
    //     const COMMAND_TOPIC  = "microsquad/terminal-1/info/command"
    //     let subject = new Subject<MicroSquadEvent>();
        
    //     const tester : Partial<Observer<MicroSquadEvent>> = {
    //       next: (event) =>{
    //         equal("terminal-1",event.deviceId)
    //         equal('terminal_command',event.type)
    //         done();
    //       }
    //     }
    //     subject.subscribe(tester);
    //     let controller = new Controller(deviceDiscovery,subject );
    //     deviceDiscovery.onInit();
    //     terminal1.onInit();


    // });


    afterAll((done) => {
        gatewayDevice?.onDestroy();
        deviceManager.destroyAllDevices().then( () => {
            server?.close();
            aedes?.close(done);
        });
        
    });

        
});

