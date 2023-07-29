import { type DonationResponse } from '../types';
import { Timezone } from './Timezone.model';

export class Donation {
  amount: number;
  level: number;
  duration: number;
  active: boolean;
  activated_at: Date;
  created_at: Date;
  valid_until: Timezone;
  days_left: number;

  constructor(data: DonationResponse) {
    this.amount = data.amount;
    this.level = data.level;
    this.duration = data.duration;
    this.active = data.active === 1;
    this.activated_at = new Date(data.activated_at);
    this.created_at = new Date(data.created_at);
    this.valid_until = new Timezone(data.valid_until);
    this.days_left = data.days_left;
  }
}
