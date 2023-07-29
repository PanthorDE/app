import { type ServerResponse } from '../types';
import { Timezone } from './Timezone.model';

export class Server {
  id: number;
  modId: number;
  appId: number;
  online: boolean;
  servername: string;
  description: string | null;
  ipAddress: string;
  port: number;
  serverPassword: number | string;
  gamemode: number;
  startParameters: string;
  slots: number;
  updateMods: number;
  playercount: number;
  players: string[];
  updatedAt: Timezone;

  constructor(data: ServerResponse) {
    this.id = data.Id;
    this.modId = data.ModId;
    this.appId = data.appId;
    this.online = data.online === 1;
    this.servername = data.Servername;
    this.description = data.Description;
    this.ipAddress = data.IpAddress;
    this.port = data.Port;
    this.serverPassword = data.ServerPassword;
    this.gamemode = data.Gamemode;
    this.startParameters = data.StartParameters;
    this.slots = data.Slots;
    this.updateMods = data.Update_Mods;
    this.playercount = data.Playercount;
    this.players = data.Players.sort();
    this.updatedAt = new Timezone(data.updated_at);
  }
}
