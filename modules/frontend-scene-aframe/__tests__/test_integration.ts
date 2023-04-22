import Aedes from 'aedes';
import { createServer, Server } from 'aedes-server-factory'

import { AddressInfo } from 'net';

import {DeviceGateway} from '../src/microsquad/homie/gateway';
import { DeviceDiscovery, HomieDeviceManager } from 'node-homie';
import { ok } from 'assert';

import { MQTTConnectOpts, notNullish } from "node-homie/model";
import { Subject, takeUntil } from "rxjs";
import { before, describe, it, after } from 'node:test';
const onDestroy$ = new Subject<boolean>();

let mqttopts : MQTTConnectOpts = { url: '' , topicRoot: 'microsquad'};

let discovery : DeviceDiscovery;
let deviceManager = new HomieDeviceManager()

let server: Server;
let port: number;
let aedes : Aedes;

  beforeAll((done) => {
    aedes = new Aedes()
    // Create a new Aedes server instance and start listening on a random port
    server = createServer(aedes);
    server.listen(0, function (){
        port = (server.address() as AddressInfo).port;
        console.debug(`now on port ${port}`);

        mqttopts.url=`mqtt://localhost:${port}`;

        discovery = new DeviceDiscovery(mqttopts);
    
        discovery.events$.pipe(
          // unsubsribe on application exit
          takeUntil(onDestroy$)
            ).subscribe({
                next: event => {
                    // new device was discovered
                    if (event.type === 'add') {
                        // if device ID is not already known...
                        if (!deviceManager.hasDevice(event.deviceId)) {
                            // create a HomieDevice and add it to the devicemanager
                            const device = deviceManager.add(event.makeDevice());
            
                            console.debug('Discovered device: ', event.deviceId);
            
                            // this will start the discovery of the complete device mqtt topic subtree
                            // the DeviceDiscovery will actually only read in the ID of the device as metadata
                            // device!.onInit();
                        }
            
                    } else if (event.type === 'remove') {
                        // remove and get the removed device ID from the devicemanager
                        const device = deviceManager.removeDevice(event.deviceId);
                        // if the device was in the devicemanager
                        if (device) {
                            // clear out the object and disconnect from mqtt
                            // note: this will not touch the device in the mqtt message bus (destroy only referes to the javascript object)
                            device.onDestroy();
                        }
            
                    } else if (event.type === 'error') {
                        console.log('Error discovering devices: ', event.error);
                    }
                }
            });

            console.log('starting discovery...')
            // start discovery
            discovery.onInit();

            done();
    });
  
  });


  afterAll((done) => {
    // deviceManager.destroyAllDevices();
    // discovery.onDestroy();
    // Close the Aedes server instance
    server.close();
    aedes.close(done)
  });

describe('MQTT integration test', (done) => {
  
  it('should declare a gateway and two terminals', () => {
    
    // let gatewayDevice = new DeviceGateway({ id: 'gateway', name: 'MicroSquad Gateway' }, mqttopts);
    // // gatewayDevice.onInit();

    // gatewayDevice.onInit().then(() =>{
    // //    ok(deviceManager.getDevice("gateway"));
    //    ok(gatewayDevice);
    // //    gatewayDevice.onDestroy();
    //    done();
    // }).catch((reason) => {
    //     console.error(`Error declaring Gateway device ${reason}` )
    // });
    ok(discovery);
    done();


   });

});
