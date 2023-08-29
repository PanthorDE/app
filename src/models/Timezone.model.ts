import {type TimezoneResponse} from '../types';

export class Timezone {
  date: Date;
  timezone_type: number;
  timezone: string;

  constructor(data: TimezoneResponse) {
    if (data !== '-') {
      this.date = new Date(data.date);
      this.timezone_type = data.timezone_type;
      this.timezone = data.timezone;
    } else {
      this.date = new Date();
      this.timezone_type = -1;
      this.timezone = '';
    }
  }
}
