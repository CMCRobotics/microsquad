import { MQTTSubject } from 'musquette'
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { foobar } from "../index";
import { of,from } from 'rxjs';

const aedes = require('aedes')()
const httpServer = require('http').createServer()
const ws = require('websocket-stream')
const port = 8888

beforeAll(() => {
  httpServer.listen(port, function () {
    console.log('Aedes websocket server listening on port ', port)
  })
});

afterAll(() => {
  httpServer.close();
  aedes.close();
});


describe("foobar()", () => {
  describe("given two positive integers", () => {
    const first = 1;
    const second = 2;

    describe("when called", () => {
      it("returns the sum of them multiplied by 3", () => {
        expect(foobar(first, second)).toEqual(9);
      });
    });

    describe('test subscription', () => {
      it("checks that hello is received", () => {
          of('hello').subscribe( data => {
          expect(data).toBe('hello');
          console.log('All good in RXJS ')
        });
      });

      it("checks that an MQTT subject can be declared", () => {
         let mqtt = new MQTTSubject(`ws://localhost:9001`);
        });
      });
  });
});
