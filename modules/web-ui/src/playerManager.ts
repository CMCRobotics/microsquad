import { Player } from "./player";
import { Vector3 } from "three";
import { Team } from "./team";
import { Observable, Observer} from "rxjs";
import { MqttMicrosquadEventType, MqttUpdateEvent } from "./mqtt";

export class PlayerManager {
    players: { [name: string]: Player } = {};
    teams: { [name: string]: Team } = {};
    defaultTeam: Team;

    circleRadius: number = 10;          // min radius of player circle
    circleMaxAngle: number = 2 * Math.PI / 3;  // max angle between first and last player
    arcDistPlayers: number = 2;        // arc distance between adjacent players
    arcDistTeams: number = 5;          // arc distance between adjacent teams

    observer = {
        next: (event) => {this.handleMQTTUpdateEvent(event)},
        error: err => console.log("Error handling MQTT Update Event "+err)
    };

    constructor (observable: Observable<MqttUpdateEvent>) {
        this.defaultTeam = new Team("__default__", [], true);
        this.teams["__default__"] = this.defaultTeam;
        observable.subscribe(this.observer);
    }

    handleMQTTUpdateEvent(event : MqttUpdateEvent){
        // console.log("Player Manager : new update "+event.id+" "+event.property);
        let playerId = event.id

        if(!this.hasPlayer(playerId)){
            this.addPlayer(playerId, false);
        }

        switch (event.property) {
            case "skin":
            case "order":
            case "accessory":
            case "nickname":
                (this.players[playerId] as any)[event.property] = event.newValue;
                break;
            case "scale":
                this.players[playerId].scaleFactor = parseFloat(event.newValue);
                break;
            case "rotation":
                (this.players[playerId] as any)[event.property] = parseFloat(event.newValue);
                break;
            case "animation":
                this.players[playerId].changeAnimation(event.newValue);
                break;
            case "say":
                this.players[playerId].say(event.newValue);
                break;
            case "say-duration":
                this.players[playerId].sayDuration = parseInt(event.newValue);
                break;
            default:
                console.warn(`PlayerManager : ${event.property} was not a recognized property.`)
                break;
        }
        this.updatePlayerPositions();
    }

    updatePlayerPositions() {
        var playerDistScaled = this.arcDistPlayers;
        var teamDistScaled = this.arcDistTeams;
        var scale = Player.model_scale;
        var numPlayers = Object.keys(this.players).length;
        var numTeams = Object.keys(this.teams).length;
        if ( this.defaultTeam.players.length === 0 && this.defaultTeam.name in this.teams )   {numTeams -= 1;}

        // Scale player size & distance between players if there are too many players/teams
        let totalDist = this.arcDistPlayers * (numPlayers + numTeams - 2) + this.arcDistTeams * (numTeams - 1);
        let maxDist = this.circleRadius * this.circleMaxAngle;
        let scaleFactor = totalDist / maxDist;
        if (scaleFactor > 1) {
            teamDistScaled = this.arcDistTeams/scaleFactor;
            playerDistScaled = this.arcDistPlayers/scaleFactor;
            scale /= scaleFactor;
        }

        // Angle between players based on arc distance and circle radius
        var theta = playerDistScaled / this.circleRadius;

        // Angle between teams
        var thetaTeams = teamDistScaled / this.circleRadius;

        // Get starting angle based on num players
        var angle = Math.PI/2 - (theta/2 * (numPlayers-1)) - (thetaTeams/2 * (numTeams-1));
        
        for (var teamName in this.teams) {
            var len = this.teams[teamName].players.length;
            if (len !== 0) {
                // Sort players by order within the team
                let sortedPlayers = this.teams[teamName].players.sort((obj1,obj2)=>(obj1.order >= obj2.order?1:-1));
                //let sortedPlayers = this.teams[teamName].players
                // Set player positions
                sortedPlayers.forEach(player => {
                    player.rotation = new Vector3(0, -angle - Math.PI/2, 0);
                    player.position = new Vector3(Math.cos(angle), 0, Math.sin(angle)).multiplyScalar(this.circleRadius);
                    player.scale = scale;
                    angle += theta;
                });

                // Set team nametag position
                let pos = this.teams[teamName].players[Math.floor(len/2)].position.clone();
                pos.y -= 1;
                this.teams[teamName].nameTag.position = pos;

                angle += thetaTeams;
            }     
        }
    }

    hasPlayer(id: string) : boolean{
        return id in this.players;
    }

    addPlayer(id: string, refresh: boolean) {
        if(!this.hasPlayer(id)){
            this.players[id] = new Player(id, this.defaultTeam);
            if(refresh){
              this.updatePlayerPositions();
            }
        }
    }

    removePlayer(id: string) {
        this.players[id].destroy();
        delete this.players[id];
    }

    assignTeam(playerName: string, teamName: string) {
        console.log(`Adding ${playerName} to ${teamName}`);
        if (playerName in this.players) {
            if (!(teamName in this.teams)) {
                this.teams[teamName] = new Team(teamName);
            }
            let player = this.players[playerName];
            let oldTeam = player.team;
            player.changeTeam(this.teams[teamName]);
            if (oldTeam.players.length === 0 && oldTeam !== this.defaultTeam) {
                oldTeam.destroy();
                delete this.teams[oldTeam.name];
            }
            this.updatePlayerPositions();
        } else {
            console.warn(`Player ${playerName} does not exist`);
        }
    }
}