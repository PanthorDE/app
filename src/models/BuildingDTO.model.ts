import { type BuildingDTOResponse } from '../types';
import { Position } from './Position.model';

export class BuildingDTO {
  id: number;
  classname: string;
  stage: number;
  location: string;
  disabled: boolean;

  constructor(data: BuildingDTOResponse) {
    this.id = data.id;
    this.classname = data.classname;
    this.stage = data.stage;
    this.location = data.location;
    this.disabled = data.disabled === 1;
  }

  public getPosition(): Position {
    return new Position(this.location);
  }
}
