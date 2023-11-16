import {addHours} from 'date-fns';
import {type RentalResponse} from '../types';

export class Rental {
  id: number;
  /** `payed_for` in hours */
  payed_for: number;
  active_until: Date;
  disabled: boolean;
  active: boolean;

  constructor(data: RentalResponse) {
    this.id = data.id;
    this.payed_for = data.payed_for;
    this.active_until = addHours(new Date(), data.payed_for);
    this.disabled = data.disabled === 1;
    this.active = data.active === 1;
  }
}
