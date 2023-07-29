import { type TimezoneResponse } from './ApiResponse.type';

export type ServerResponse = {
  Id: number;
  ModId: number;
  appId: number;
  online: number;
  Servername: string;
  Description: string | null;
  IpAddress: string;
  Port: number;
  ServerPassword: number | string;
  Gamemode: number;
  StartParameters: string;
  Slots: number;
  Update_Mods: number;
  Playercount: number;
  Players: string[];
  updated_at: TimezoneResponse;
};
