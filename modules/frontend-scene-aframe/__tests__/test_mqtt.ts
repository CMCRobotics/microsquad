import { connect } from 'mqtt';
import Aedes from 'aedes';
import { createServer, Server } from 'aedes-server-factory'

import { AddressInfo } from 'net';

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
    // done()
  });

  afterAll((done) => {
    // Close the Aedes server instance
    server.close();
    aedes.close(done)
  });

  it('should receive a message published to a topic', (done) => {
    // Connect a client to the Aedes server
    const client = connect(`mqtt://localhost:${port}`);

    // Subscribe to a topic
    client.subscribe('test/topic', () => {
      // Publish a message to the topic
      client.publish('test/topic', 'Hello, world!');

      // Wait for the message to be received
      client.on('message', (topic, payload) => {
        expect(topic).toEqual('test/topic');
        expect(payload.toString()).toEqual('Hello, world!');
        client.end(done());
      });
    });

  });
});
