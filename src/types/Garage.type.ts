import { type Sides } from './Side.type';

export type VehicleType = 'Car' | 'Ship' | 'Air';

export type VehicleResponse = {
  id: number;
  pid: string;
  side: Sides;
  classname: string;
  type: VehicleType;
  plate: string;
  active: number;
  impound: number;
  alarm: number;
  disabled: number;
  color: string;
  inventory: string;
  gear: string;
  fuel: string;
  fuelcargo: number;
  tuning_color: null;
  tuning_array: string;
  tuning_perm: number;
  hitpoints: string;
  kilometer: number;
  kilometer_total: number;
  lastgarage: string;
  alive: number;
  insurance: number;
  companyid: number;
  companytype: string;
  updated_at: string;
  created_at: string;
  vehicle_data: {
    id: number;
    classname: string;
    name: string;
    price: number;
    level: number;
    v_space: number;
    shoptype: string;
    shopname: string;
    type: VehicleType;
  };
  export_vehicles: {
    id: number;
    classname: string;
    name: string;
    price: number;
    level: number;
    v_space: number;
    shoptype: string;
    shopname: string;
    type: VehicleType;
  }[];
};
