import { Observable } from "rxjs";
import { DeviceGateway } from "../homie/gateway";
import { GameEventTypeEnum, MicroSquadEvent, MicroSquadEventType } from "./event";


/**
 * A Huddle Manager instantiates and controls the lifecycle of huddles. 
 * A **Huddle** is a temporary congregation of MicroSquad terminals and players taking part in the same activity.
 * The activity may be a game with strict rules and phases, or a freely organized data collection.
 * 
 * The huddle manager propagate relevant events (e.g. from terminal sensors) to the currently running activity.
 * It can for instance:
 *   * register a new player node when a new terminal is discovered.
 *   * regroup players into teams based in specific sorting criterias.
 */
export class HuddleManager {
    private eventSource: Observable<MicroSquadEvent<MicroSquadEventType>>
    private deviceGateway: DeviceGateway

    constructor(eventSource: Observable<MicroSquadEvent<MicroSquadEventType>>, deviceGateway: DeviceGateway) {
        this.eventSource = eventSource;
        this.deviceGateway = deviceGateway;

        // Register for Game/Huddle related events on the Game Homie device
        // TODO : Rename Game to Huddle

        // Register for sensor events so they can be forwarded to the currently running activity when it runs
    }

    public getDeviceGateway() : DeviceGateway {
        return this.deviceGateway
    }
    
    public handleHuddleEvent(event: MicroSquadEvent<MicroSquadEventType>):void{
        switch(event.type){
            case "game_start":
                // Initiate a new game controller matching the game name
                // update game status
                break;
            case "game_stop":
                // clean up the game and update game status
                break;
            case "game_transition":
                // fire transition in currently running game
            case "game_transitions_updated":
                // if game ongoing, update the property of available transitions

        }
    }
}