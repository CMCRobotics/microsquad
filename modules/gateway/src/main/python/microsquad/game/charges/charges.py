import logging

from ..abstract_game import AGame, set_next_in_collection, set_prev_in_collection

import enum
import random
from rx3 import Observable
from microsquad.event import EVENTS_SENSOR, EventType, MicroSquadEvent
from microsquad.mapper.homie.gateway.device_gateway import DeviceGateway


@enum.unique
class TRANSITIONS(enum.Enum):
  START = "Start"
  SEND_ELECTRON = "Send an electron"
  SEND_PROTON = "Send a proton"
  SEND_MYSTERY = "Send a surprise"
  VOTE = "Vote"
  RESULTS = "Show results"

@enum.unique
class PARTICLE(enum.Enum):
    PROTON = ("proton","09990:99399:99999:99990:99000", "30903:30003:30003:30003:30003;30903:30903:30003:30003:30003;30903:30903:30903:39003:90003")
    ELECTRON = ("electron","90009:09090:00000:99999:90909", "30903:30003:30003:30003:30003;30903:30903:30003:30003:30003;30903:30903:30903:30093:30009")

    def __init__(self, identifier : str, display : str, trajectory : str) -> None:
        self.display = display
        self.trajectory = trajectory
        self.identifier = identifier
    

PARTICLES = list(PARTICLE)
TRANSITION_GRAPH = { 
                TRANSITIONS.START : [TRANSITIONS.SEND_ELECTRON, TRANSITIONS.SEND_PROTON],
                TRANSITIONS.SEND_ELECTRON : [TRANSITIONS.SEND_ELECTRON, TRANSITIONS.SEND_PROTON, TRANSITIONS.SEND_MYSTERY],
                TRANSITIONS.SEND_PROTON :  [TRANSITIONS.SEND_ELECTRON, TRANSITIONS.SEND_PROTON, TRANSITIONS.SEND_MYSTERY],
                TRANSITIONS.SEND_MYSTERY : [TRANSITIONS.VOTE],
                TRANSITIONS.VOTE : [TRANSITIONS.RESULTS]
            }

logger = logging.getLogger(__name__)


class Game(AGame):
    """ 
    A simple game that allows to declare new players and customize their appearance
    """
    def __init__(self, event_source: Observable, gateway : DeviceGateway) -> None:
        super().__init__(event_source, gateway)
        self._last_sent_particle = None
        
    def start(self) -> None:
        print("Charges game starting")
        super().update_available_transitions([TRANSITIONS.START])
        super().device_gateway.update_broadcast("image,value=30003:30003:30003:30003:30003,delay=2000,clear=false")

    def process_event(self, event:MicroSquadEvent) -> None:
        logger.debug("Charges received event {} for device {}: {}".format(event.event_type.name, event.device_id, event.payload))
        self.device_gateway.get_node("players-manager").add_player(event.device_id)
        if event.event_type in EVENTS_SENSOR:
            playerNode = self.device_gateway.get_node("player-"+event.device_id)
            if playerNode is None:
                logger.warn("Player {} is not known".format("player-"+event.device_id))
            else:
                if super().last_fired_transition == TRANSITIONS.VOTE.value:
                    if event.event_type == EventType.VOTE:
                        # Store the player's vote
                        # Compare to what was sent (some players didn't vote ?)
                        pass
                    

    def fire_transition(self, transition) -> None:
        super().fire_transition(transition)
        # Obtain the next transitions in the graph
        # If none, the game can be stopped
        next_transitions = None
        try:
          next_transitions = TRANSITION_GRAPH[TRANSITIONS(self._last_fired_transition)]
        except KeyError:
          logger.debug("No next transitions available after "+self._last_fired_transition)
        
        if(next_transitions is not None and len(next_transitions) > 0):
                super().update_available_transitions(next_transitions)
        else:
                super().update_available_transitions([])  
        
        if(TRANSITIONS(self._last_fired_transition) == TRANSITIONS.SEND_ELECTRON):
            # TODO : Add images and sounds on the scoreboard
            logger.debug("Sending an electron")
            super().device_gateway.update_broadcast("image,value="+PARTICLE.ELECTRON.trajectory+",delay=1000,clear=false")
        elif(TRANSITIONS(self._last_fired_transition) == TRANSITIONS.SEND_PROTON):
            # TODO : Add images and sounds on the scoreboard
            logger.debug("Sending a proton")
            super().device_gateway.update_broadcast("image,value="+PARTICLE.PROTON.trajectory+",delay=1000,clear=false")
        elif(TRANSITIONS(self._last_fired_transition) == TRANSITIONS.SEND_MYSTERY):
            self._last_sent_particle = random.choice(PARTICLES)
            logger.debug("Sending ".format(self._last_sent_particle.identifier))
            super().device_gateway.update_broadcast("image,value="+self._last_sent_particle.trajectory+",delay=1000,clear=false")
        elif(TRANSITIONS(self._last_fired_transition) == TRANSITIONS.VOTE):
            # vote_str = "vote,value="+(";".join([p.display for p in PARTICLES]))+",duration=4000"
            vote_str = "vote_particles"
            logger.debug("Sending {}".format(vote_str))
            super().device_gateway.update_broadcast(vote_str)
        elif(TRANSITIONS(self._last_fired_transition) == TRANSITIONS.RESULTS):
            # Tally up the votes, make players say the result, change their animation (DEATH if they are wrong)
            pass



    def stop(self) -> None:
        print("Charges stopped")
