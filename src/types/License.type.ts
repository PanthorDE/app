import { type Sides } from './Side.type';

export type LicenseResponse = {
  pid: string;
  license: string;
  created_at: string;
  export_licence: {
    id: number;
    license: string;
    name: string;
    price: number;
    illegal: number;
    side: Sides;
    level: number;
  } | null;
};
