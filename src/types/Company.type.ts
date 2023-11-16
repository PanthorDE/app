import type {BankAccountResponse} from './BankAccount.type';

export type CompanyResponse = {
  id: number;
  name: string;
  description: string;
  phone: string;
  bank_1: string;
  bank_2: string;
  icon: string;
  level: number;
  non_profit: number;
  special_type: string;
  perms: string;
  payed_for: number;
  disabled: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  bank_details?: {
    bank_1: BankAccountResponse;
    bank_2: BankAccountResponse;
  };
  shops?: unknown[];
};
