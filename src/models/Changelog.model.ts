import {type ChangelogResponse} from '../types';

export class Changelog {
  id: number;
  version: string;
  changeMission: string[];
  changeMap: string[];
  changeMod: string[];
  note: string;
  active: boolean;
  size: string | null;
  releaseAt: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: ChangelogResponse) {
    this.id = data.id;
    this.version = data.version;
    this.changeMission = data.change_mission;
    this.changeMap = data.change_map;
    this.changeMod = data.change_mod;
    this.note = data.note;
    this.active = data.active === 1;
    this.size = data.size;
    this.releaseAt = new Date(data.release_at);
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
  }

  hasModChange(): boolean {
    return this.changeMod.length > 0;
  }
}
