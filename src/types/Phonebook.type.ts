import type {Sides} from './Side.type';

export type PhonebookResponse = {
  pid: string;
  /** Identity Nr */
  idNR: number;
  phonebook: {
    number: string;
    name: string;
    type: string;
    special: string;
    iban: string;
  }[];
  updated_at: string;
  created_at: string;
  laravel_through_key: string;
  side: Sides;
  identity: {
    id: number;
    pid: string;
    side: Sides;
    name: string;
    created_at: Date;
    id_birthday: Date;
    id_nationality: string;
    rac_membership: string;
    variables: string;
  };
};
