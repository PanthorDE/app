import { type ServerResponse } from './Server.type';

export type RpgServerResponse = ServerResponse & {
  Civilians: number;
  Medics: number;
  Cops: number;
  Adac: number;
  Side: {
    Civs: string[];
    Medics: string[];
    Cops: string[];
    RAC: string[];
  };
};
