import { HomieDevice, HomieNode, HomieProperty } from "node-homie"

export enum SensorEventTypeEnum {
    bonjour, vote, accel, button,temperature
}

export enum TerminalEventTypeEnum {
    terminal_broadcast, terminal_command
}

export enum GameEventTypeEnum {
    game_start, game_pause, game_stop, game_transition, game_transitions_updated
}

export enum DiscoveryEventTypeEnum {
    terminal_discovered, player_discovered, team_discovered, game_discovered
}

export enum RemovalEventTypeEnum {
    terminal_removed, player_removed, team_removed, game_removed
}

export declare type SensorEventType = keyof typeof SensorEventTypeEnum
export declare type TerminalEventType = keyof typeof TerminalEventTypeEnum
export declare type GameEventType =  keyof typeof GameEventTypeEnum
export declare type DiscoveryEventType = keyof typeof DiscoveryEventTypeEnum
export declare type RemovalEventType = keyof typeof RemovalEventTypeEnum
export declare type MicroSquadEventType = SensorEventType | TerminalEventType | GameEventType | DiscoveryEventType | RemovalEventType
     
export function ofProperty(type: MicroSquadEventType, property: HomieProperty, payload? : any) : MicroSquadEvent{
    return new MicroSquadEvent(type, property.device.id, property.node.id, property.id, payload)
}
export function ofNode(type: MicroSquadEventType, node: HomieNode, payload? : any) : MicroSquadEvent{
    return new MicroSquadEvent(type, node.device.id, node.id, payload)
}

export function ofDevice(type: MicroSquadEventType, device: HomieDevice, payload? : any) : MicroSquadEvent{
    return new MicroSquadEvent(type, device.id, payload)
}
/**
 * An Event data transfer object, for MicroSquad events of a higher functional level (as compared to Homie device property events).
 */
export class MicroSquadEvent {
    constructor(
        type: MicroSquadEventType,
        deviceId: string, nodeId?: string,
        propertyId?: string,
        payload?: any) { }
}
