import logging

from homie.node.property.property_string import Property_String
from homie.node.property.property_color import Property_Color
from homie.node.node_base import Node_Base

logger = logging.getLogger(__name__)

class NodeTeam(Node_Base):
    _instance_count = 1

    def __init__(
        self,
        device,
        id="team",
        name="Team",
        type_="team",
        retain=True,
        qos=1
    ):
      super().__init__(device, id, name, type_, retain, qos)

      self.add_property(Property_String(self, id="nickname" , name="Nickname"))
      self.add_property(Property_String(self, id="players"  , name="Players"))
      # hexadecimal color value (replace with Color Property when implemented in Homie client lib)
      self.add_property(Property_String(self, id="color", name="Color")) 

