import { type BankAccountDTOResponse } from '../types';

export class BankAccountDTO {
  pid: string;
  iban: string;
  owner: string;
  balance: number;
  default_account: boolean;

  constructor(data: BankAccountDTOResponse, owner = 'Unknown') {
    this.pid = data.pid;
    this.iban = data.iban;
    this.owner = owner;
    this.balance = data.balance;
    this.default_account = data.default_account === 1;
  }
}
