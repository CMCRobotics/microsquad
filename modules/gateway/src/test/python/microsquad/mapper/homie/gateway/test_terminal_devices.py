from microsquad.mapper.homie.terminal.device_terminal import DeviceTerminal

import unittest

from rx3.subject import Subject

from microsquad.event import EventType

class TestTerminalDevice(unittest.TestCase):
    def setUp(self):
        self.mqtt_settings = {
            'MQTT_BROKER' : 'localhost',
            'MQTT_PORT' : 1883,
        }
        self.received_events = []
        self.terminals: DeviceTerminal = []
        self._event_source = Subject()
        self.terminals.append(DeviceTerminal(device_id="terminal-01",name="Terminal 01",event_source=self._event_source, mqtt_settings=self.mqtt_settings))
        

    def test_add_terminal(self):
        self.terminals[0].get_node("button-a").get_property("pressed").value = True
        self.assertTrue(self.terminals[0].get_node("button-a").get_property("pressed").value)

    def test_terminal_command_event(self):
        subscriber = self._event_source.subscribe(on_next = lambda evt: self.received_events.append(evt) )
        command_string = "vote,image=99999"
        self.terminals[0].update_command(command_string)
        self.assertEqual(1,len(self.received_events))
        self.assertEqual(EventType.TERMINAL_COMMAND, self.received_events[0].event_type)
        self.assertIsNone(self.received_events[0].device_id)
        self.assertEqual(command_string, self.received_events[0].payload)


if __name__ == '__main__':
    unittest.main()