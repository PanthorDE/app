import { type BuildingResponse } from '../types';
import { BuildingDTO } from './BuildingDTO.model';

export class Building extends BuildingDTO {
  players: string[];

  constructor(data: BuildingResponse) {
    super({ ...data });
    this.players = data.players;
  }
}
