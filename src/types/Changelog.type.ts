export type ChangelogResponse = {
  id: number;
  version: string;
  change_mission: string[];
  change_map: string[];
  change_mod: string[];
  note: string;
  active: number;
  size: string | null;
  release_at: string;
  created_at: string;
  updated_at: string;
};
