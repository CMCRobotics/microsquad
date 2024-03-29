#!/usr/bin/env python
 
import logging

from homie.device_base import Device_Base

from homie.node.property.property_string import Property_String
from homie.node.property.property_boolean import Property_Boolean
from homie.node.node_base import Node_Base
from rx3 import Observable

from ..terminal.device_terminal import DeviceTerminal
from ....event import MicroSquadEvent,EventType

from .node_player_manager import NodePlayerManager

from .node_team_manager import NodeTeamManager

logger = logging.getLogger(__name__)


class DeviceGateway(Device_Base):
    """
    The Gateway device exposes properties of the microsquad gateway.

    It can be used to read properties of the ongoing game, players and teams currently active.
    """
    
    def __init__(
        self,
        event_source : Observable,
        device_id= "gateway",
        name="MicroSquad Gateway",
        homie_settings=None,
        mqtt_settings=None
    ):
        super().__init__(device_id, name, homie_settings, mqtt_settings)

        # Keep track of mqtt settings to instantiate Terminal devices
        self._mqtt_settings = mqtt_settings

        self._scoreboard = Node_Base(self,id="scoreboard", name="Scoreboard", type_="scoreboard")
        self.add_node(self._scoreboard)
        self._scoreboard.add_property(Property_String(node = self._scoreboard, id="score",name="Score" ))
        self._scoreboard.add_property(Property_String(node = self._scoreboard, id="image",name="Image" ))
        self._scoreboard.add_property(Property_String(node = self._scoreboard, id="sound", name="Sound", retained=False ))
        self._scoreboard.add_property(Property_String(node = self._scoreboard, id="show",name="Show" ))

        self._player_manager = NodePlayerManager(self)
        self.add_node(self._player_manager)

        self._team_manager = NodeTeamManager(self)
        self.add_node(self._team_manager)

        self._terminals = {}

        self._game_node = Node_Base(self,id="game", name="game", type_="game")
        self.add_node(self._game_node)
        
        self._game_node.add_property(Property_String(node = self._game_node, settable= True, set_value =self.update_game, id="name",name="Name" ))
        self._last_known_game : str = None

        self._game_node.add_property(Property_String(node = self._game_node, id="game-status",name="Game Status" ))
        self._game_node.add_property(Property_String(node = self._game_node, id="transitions",name="Transitions" ))
        self._game_node.add_property(Property_String(node = self._game_node, settable= True, set_value =self.fire_transition, id="fire-transition",name="The transition fired to further the game's progression" ))
        # self._game.add_property(Property_String(node = self._game, id="audience-code",name="audience-code" ))
        # self._game.add_property(Property_String(node = self._game, id="admin-code",name="admin-code" ))
        self._game_node.add_property(Property_String(node = self._game_node, settable= True, set_value =self.update_broadcast, id="broadcast",name="Broadcast" ))

        self._event_source = event_source
        if self._event_source is None:
            raise ValueError("Gateway must be passed an event source.")

    
    def add_terminal(self, device_id : str):
        if(device_id not in self.terminals.keys()):
            terminal = DeviceTerminal(event_source = self._event_source,device_id = "terminal-"+str(device_id), name="Terminal "+str(device_id), homie_settings=self.homie_settings, mqtt_settings=self._mqtt_settings)
            terminal.get_node("info").get_property("terminal-id").value = device_id
            terminal.get_node("info").get_property("serial-number").value = device_id
            logging.info("Added new terminal {}".format(device_id))
            self._terminals[device_id] = terminal
            terminal.start()
            self._event_source.on_next(MicroSquadEvent(EventType.TERMINAL_DISCOVERED, device_id))
            
    @property
    def terminals(self):
        return self._terminals

    @property
    def game_node(self):
        return self._game_node

    def update_game(self, new_game):
        """
        A new game should be started, execute it.
        """
        if(new_game is None or new_game == ""):
            self._event_source.on_next(MicroSquadEvent(EventType.GAME_STOP))
        elif(not(self._game_node.get_property("game-status").value == EventType.GAME_START) or (self._last_known_game != new_game)):
            self._event_source.on_next(MicroSquadEvent(EventType.GAME_START, payload=new_game))
            self._last_known_game = new_game

    def update_broadcast(self, command):
        """
        A new broadcast command has been sent, we need to propagate it to all terminals
        """
        self._event_source.on_next(MicroSquadEvent(EventType.TERMINAL_BROADCAST,payload = command))

    def fire_transition(self, transition):
        """
        A new transition has been fired, we need to propagate it to the game
        """
        self._event_source.on_next(MicroSquadEvent(EventType.GAME_TRANSITION,payload = transition))