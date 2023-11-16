import {type HouseDTOResponse} from './HouseDTO.type';

export type HouseResponse = HouseDTOResponse & {
  players: string[];
};
