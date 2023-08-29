import {type Sides} from './Side.type';

export type PhoneResponse = {
  pid: string;
  phone: string;
  note: string;
  side: Sides;
  idNR: number;
  disabled: number;
  created_at: string;
  updated_at: string;
};
