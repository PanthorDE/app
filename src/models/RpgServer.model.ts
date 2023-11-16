import {type RpgServerResponse} from '../types';
import {Server} from './Server.model';

export class RpgServer extends Server {
  civilians: number;
  medics: number;
  cops: number;
  rac: number;
  justice: number;
  side: {
    civs: string[];
    medics: string[];
    cops: string[];
    justice: string[];
    rac: string[];
  };

  constructor(data: RpgServerResponse) {
    super(data);
    const onlineDojPlayers: string[] = data.Side.Cops.filter(player => player.includes('[Justiz]'));
    const onlinePolicePlayers: string[] = data.Side.Cops.filter(player => !player.includes('[Justiz]'));
    this.civilians = data.Civilians;
    this.medics = data.Medics;
    this.rac = data.Adac;
    this.justice = onlineDojPlayers.length;
    this.cops = onlinePolicePlayers.length;
    this.side = {
      civs: data.Side.Civs.sort(),
      medics: data.Side.Medics.sort(),
      rac: data.Side.RAC.sort(),
      justice: onlineDojPlayers.sort(),
      cops: onlinePolicePlayers.sort(),
    };
  }
}
