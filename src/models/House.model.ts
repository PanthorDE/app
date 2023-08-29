import {type HouseResponse} from '../types';
import {HouseDTO} from './HouseDTO.model';

export class House extends HouseDTO {
  players: string[];

  constructor(data: HouseResponse) {
    super({...data});
    this.players = data.players;
  }
}
