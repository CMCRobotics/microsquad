import logging

from homie.node.property.property_temperature import Property_Temperature
from homie.node.node_base import Node_Base

logger = logging.getLogger(__name__)

class NodeEnvironment(Node_Base):
    def __init__(
        self,
        device,
        id = "environment",
        name = "Environment",
        temp_units="C",
        type_="environment",
        retain=True,
        qos=1
    ):
      super().__init__(device, id, name, type_, retain, qos)
      self.temp_units = temp_units
      self.temperature = Property_Temperature(self, unit=self.temp_units)
      self.add_property(self.temperature)
      