import { Observable } from "rxjs";
import { DeviceGateway } from "./homie/gateway";
import { GameEventTypeEnum, MicroSquadEvent, MicroSquadEventType } from "./event";


/**
 * A Game Manager instantiates and controls the lifecycle of games. 
 * A **Game** is a temporary congregation of MicroSquad terminals and players taking part in the same activity.
 * The activity may be a game with strict rules and phases, or a freely organized data collection.
 * 
 * The huddle manager propagate relevant events (e.g. from terminal sensors) to the currently running activity.
 * It can for instance:
 *   * register a new player node when a new terminal is discovered.
 *   * regroup players into teams based in specific sorting criterias.
 */
export class GameManager {
    private eventSource: Observable<MicroSquadEvent>
    private deviceGateway: DeviceGateway

    constructor(eventSource: Observable<MicroSquadEvent>, deviceGateway: DeviceGateway) {
        this.eventSource = eventSource;
        this.deviceGateway = deviceGateway;

        // TODO : Register for Game-related events on the Game Homie device
        
        // TODO : Register for sensor events so they can be forwarded to the currently running activity when it runs
    }

    public getDeviceGateway() : DeviceGateway {
        return this.deviceGateway
    }
    
    public handleGameEvent(event: MicroSquadEvent):void{
        switch(event.type){
            case "game_start":
                // Initiate a new game controller matching the game name
                // update game status
                // execute the game : It can be a CORS script, a local class
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