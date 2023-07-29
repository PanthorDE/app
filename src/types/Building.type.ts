import { type BuildingDTOResponse } from './BuildingDTO.type';

export type BuildingResponse = BuildingDTOResponse & {
  players: string[];
};
