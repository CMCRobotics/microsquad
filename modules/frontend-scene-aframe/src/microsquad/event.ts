export enum SensorEventTypeEnum {
    bonjour, vote, accel, button,temperature
}

export enum TerminalEventTypeEnum {
    terminal_broadcast, terminal_command
}

export enum GameEventTypeEnum {
    game_start, game_pause, game_stop, game_transition, game_transitions_updated
}

export declare type SensorEventType = keyof typeof SensorEventTypeEnum
export declare type TerminalEventType = keyof typeof TerminalEventTypeEnum
export declare type GameEventType =  keyof typeof GameEventTypeEnum
export declare type MicroSquadEventType = SensorEventType | TerminalEventType | GameEventType
                        
/**
 * An Event data transfer object, for MicroSquad events of a higher functional level (as compared to Homie device property events).
 */
export interface MicroSquadEvent<T extends MicroSquadEventType> {
    type?: T;
    deviceId?: string;
    nodeId?: string;
    propertyId?: string;
    payload?: any;
}
