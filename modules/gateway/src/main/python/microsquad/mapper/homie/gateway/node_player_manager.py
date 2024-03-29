import logging

from homie.node.property.property_string import Property_String
from homie.node.node_base import Node_Base

from .node_player import NodePlayer

logger = logging.getLogger(__name__)

class NodePlayerManager(Node_Base):

    def __init__(self, device):
      super().__init__(device, id="players-manager", name="Players Manager", type_="players_manager", retain=True, qos=1)
      
      self.add_property(Property_String(self, id="add", settable=True, name="add player", set_value = self.add_player ))
      self.add_property(Property_String(self, id="remove", settable=True, name="remove player", set_value = self.remove_player ))

      self.players = []
      self.player_counter = 0
      self.add_property(Property_String(self, id="list", name="list" ))
    
    def remove_player(self,identifier):
        if(identifier in self.players):
            logger.info("Removing Player : {}".format(identifier))
            self.players.remove(identifier)
            self.device.remove_node("player-"+identifier)
            self.get_property("list").value = ",".join(self.players)

    def add_player(self,identifier):
        """
            TODO : Split the identifier either: 
                - id
                - id:name 
                - id:name:nickname
                - or empty (random UUID)
        """
        if(identifier not in self.players):
            self.player_counter += 1
            new_player = NodePlayer(self.device,id="player-"+identifier, name=identifier, order = identifier)
            new_player.get_property("terminal-id").value = identifier
            self.device.add_node(new_player)
            self.players.append(identifier)
            self.get_property("list").value = ",".join(self.players)
            logger.info("Player Added : {}".format(identifier))
