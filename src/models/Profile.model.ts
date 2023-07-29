import { type ProfileResponse } from '../types';
import { BankAccount } from './BankAccount.model';
import { BankAccountDTO } from './BankAccountDTO.model';
import { Building } from './Building.model';
import { BuildingDTO } from './BuildingDTO.model';
import { Company } from './Company.model';
import { Donation } from './Donation.model';
import { House } from './House.model';
import { HouseDTO } from './HouseDTO.model';
import { License } from './License.model';
import { Phone } from './Phone.model';
import { Phonebook } from './Phonebook.model';
import { Position } from './Position.model';
import { Rental } from './Rental.model';
import { RpgServer } from './RpgServer.model';
import { Server } from './Server.model';
import { Timezone } from './Timezone.model';

export class Profile {
  id: number;
  pid: string;
  guid: string;
  name: string;
  cash: number;
  bankacc: number;
  coplevel: string;
  mediclevel: string;
  adaclevel: string;
  adminlevel: string;
  donatorlvl: string;
  justizlevel: string;
  arrested: number;
  citizen: number;
  tutorial: number;
  dsgvo: number;
  level: number;
  exp: number;
  skillpoint: number;
  hunger: number;
  thirst: number;
  tuning_tickets: number;
  jail_time: number;
  quest_daily: number;
  quest_row: number;
  pos: Position;
  pos_alive: number;
  pos_free: number;
  suspended: number;
  second_char: number;
  server_id: number;
  chat_muted: number;
  joined_at: Date;
  updated_at: Date;
  created_at: Date;
  avatar: string;
  avatar_full: string;
  avatar_medium: string;
  profilename: string;
  profileurl: string;
  last_seen: Timezone;
  level_progress: number;
  donations: Donation[];
  /** Playtime in minutes */
  play_time: {
    active: number;
    total: number;
  };
  garage: {
    value: number;
    count: number;
  };
  houses: House[];
  houses_keyed: HouseDTO[];
  rentals: Rental[];
  buildings: Building[];
  buildings_keyed: BuildingDTO[];
  phones: Phone[];
  company_owned: Company[];
  phonebooks: Phonebook[];
  licenses: License[];
  bank_main: BankAccount[];
  banks: BankAccountDTO[];

  constructor(data: ProfileResponse) {
    this.id = data.id;
    this.pid = data.pid;
    this.guid = data.guid;
    this.name = data.name;
    this.cash = data.cash;
    this.bankacc = data.bankacc;
    this.coplevel = data.coplevel;
    this.mediclevel = data.mediclevel;
    this.adaclevel = data.adaclevel;
    this.adminlevel = data.adminlevel;
    this.donatorlvl = data.donatorlvl;
    this.justizlevel = data.justizlevel;
    this.arrested = data.arrested;
    this.citizen = data.citizen;
    this.tutorial = data.tutorial;
    this.dsgvo = data.dsgvo;
    this.level = data.level;
    this.exp = data.exp;
    this.skillpoint = data.skillpoint;
    this.hunger = data.hunger;
    this.thirst = data.thirst;
    this.tuning_tickets = data.tuning_tickets;
    this.jail_time = data.jail_time;
    this.quest_daily = data.quest_daily;
    this.quest_row = data.quest_row;
    this.pos = new Position(data.pos);
    this.pos_alive = data.pos_alive;
    this.pos_free = data.pos_free;
    this.suspended = data.suspended;
    this.second_char = data.second_char;
    this.server_id = data.server_id;
    this.chat_muted = data.chat_muted;
    this.joined_at = new Date(data.joined_at);
    this.updated_at = new Date(data.updated_at);
    this.created_at = new Date(data.created_at);
    this.avatar = data.avatar;
    this.avatar_full = data.avatar_full;
    this.avatar_medium = data.avatar_medium;
    this.profilename = data.profilename;
    this.profileurl = data.profileurl;
    this.last_seen = new Timezone(data.last_seen);
    this.level_progress = data.level_progress;
    this.donations = data.donations.map((props) => new Donation(props));
    this.play_time = data.play_time;
    this.garage = data.garage;
    this.houses = data.houses.map((props) => new House(props));
    this.houses_keyed = data.houses_keyed.map((props) => new HouseDTO(props));
    this.rentals = data.rentals.map((props) => new Rental(props));
    this.buildings = data.buildings.map((props) => new Building(props));
    this.buildings_keyed = data.buildings_keyed.map((props) => new BuildingDTO(props));
    this.phones = data.phones.map((props) => new Phone(props));
    this.company_owned = data.company_owned.map((props) => new Company(props));
    this.phonebooks = data.phonebooks.map((props) => new Phonebook(props));
    this.licenses = data.licenses.map((props) => new License(props));
    this.bank_main = data.bank_main.map((props) => new BankAccount(props, data.name));
    this.banks = data.banks.map((props) => new BankAccountDTO(props));
  }

  public transformPlaytime() {
    const { active, total } = this.play_time;
    return {
      active: active / 60,
      total: total / 60,
    };
  }

  public getActiveCompanies(): Company[] {
    return this.company_owned.filter((company) => !company.disabled);
  }

  /**
   * If the `name` of the player is in the player-list hes currently online
   */
  public isOnline(servers: RpgServer[] | Server[]): boolean {
    return servers.some((server) => server.players.includes(this.name));
  }

  public getBankAccounts(): BankAccount[] | BankAccountDTO[] {
    const list: BankAccount[] | BankAccountDTO[] = [
      ...this.bank_main,
      ...this.getActiveCompanies()
        .filter((c) => c.bank_details)
        .flatMap(({ bank_details }) => {
          const details = bank_details as Exclude<Company['bank_details'], undefined>;
          return [details.bank_1, details.bank_2];
        }),
    ];

    this.banks.forEach((acc) => {
      // @ts-expect-error
      if (!list.some((le) => le.iban === acc.iban)) list.push(acc);
    });
    return list;
  }

  public getHouses(): House[] | HouseDTO[] {
    const list: House[] | HouseDTO[] = [...this.houses];

    this.houses_keyed.forEach((house) => {
      // @ts-expect-error
      if (!list.some((li) => li.id === house.id)) list.push(house);
    });

    return list;
  }

  public getBuildings(): Building[] | BuildingDTO[] {
    const list: Building[] | BuildingDTO[] = [...this.buildings];

    this.buildings_keyed.forEach((building) => {
      // @ts-expect-error
      if (!list.some((li) => li.id === building.id)) list.push(building);
    });

    return list;
  }
}
