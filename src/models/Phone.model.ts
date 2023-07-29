import { type PhoneResponse } from '../types';
import { Side } from './Side.model';

export class Phone {
  pid: string;
  phone: string;
  note: string;
  side: Side;
  idNR: number;
  disabled: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: PhoneResponse) {
    this.pid = data.pid;
    this.phone = data.phone;
    this.note = data.note;
    this.side = new Side(data.side);
    this.idNR = data.idNR;
    this.disabled = data.disabled === 1;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
  }

  getNoteLabel(): string {
    switch (this.note) {
      case 'default':
        return 'Standard';
      case 'bought':
        return 'Gekauft';
      default:
        return this.note;
    }
  }
}
