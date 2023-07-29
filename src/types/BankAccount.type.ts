import { type BankAccountDTOResponse } from './BankAccountDTO.type';

export type BankAccountResponse = BankAccountDTOResponse & {
  id: number;
  disabled: number;
  created_at: string;
  updated_at: string;
};
