import {type BankAccountResponse} from '../types';
import {BankAccountDTO} from './BankAccountDTO.model';

export class BankAccount extends BankAccountDTO {
  id: number;
  disabled: boolean;
  private created_at: Date;
  private updated_at: Date;

  constructor(data: BankAccountResponse, owner?: string) {
    super(data);
    this.id = data.id;
    if (owner) this.owner = owner;
    this.disabled = data.disabled === 1;
    this.created_at = new Date(data.created_at);
    this.updated_at = new Date(data.updated_at);
  }
}
