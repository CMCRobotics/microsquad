import { connect } from 'mqtt';
import Aedes from 'aedes';
import { createServer, Server } from 'aedes-server-factory'

import { AddressInfo } from 'net';

import {DeviceGateway} from '../src/microsquad/homie/gateway';
import { HomieDeviceManager } from 'node-homie';



describe('MQTT integration test', () => {
  let server: Server;
  let port: number;
  let aedes : Aedes;

  beforeAll((done) => {
    aedes = new Aedes()
    // Create a new Aedes server instance and start listening on a random port
    server = createServer(aedes);
    server.listen(0, function (){
        port = (server.address() as AddressInfo).port;
        console.log(`now on port ${port}`)
        done()
    });
  });

  afterAll((done) => {
    // Close the Aedes server instance
    server.close();
    aedes.close(done)
  });

  it('should declare a gateway and two terminals', (done) => {
    let gatewayDevice = new DeviceGateway({ id: 'gateway', name: 'MicroSquad Gateway' }, {
        url: `mqtt://localhost:${port}`,
        topicRoot: 'microsquad' 
    });

    // let deviceManager = new HomieDeviceManager()
    
    // const client = connect(`mqtt://localhost:${port}`);

    // client.publish('microsquad/gateway/', 'Hello, world!');

    // Perform various checks

    
   });

});
