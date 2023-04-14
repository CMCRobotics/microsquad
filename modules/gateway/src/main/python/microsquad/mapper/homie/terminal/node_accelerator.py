import logging

from homie.node.property.property_integer import Property_Integer
from homie.node.property.property_string import Property_String
from homie.node.node_base import Node_Base

logger = logging.getLogger(__name__)

class NodeAccelerator(Node_Base):
    def __init__(
        self,
        device,
        id = "accelerator",
        name = "Accelerator",
        type_="accelerator",
        retain=True,
        qos=1
    ):
      super().__init__(device, id, name, type_, retain, qos)

      self.add_property(Property_Integer(self, id="x", name="X", settable=False))
      self.add_property(Property_Integer(self, id="y", name="Y", settable=False))
      self.add_property(Property_Integer(self, id="z", name="Z", settable=False))
      self.add_property(Property_String(self, id="value", name="Value", settable=False))
       

