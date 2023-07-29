import { type CompanyShopItemResponse, type CompanyShopResponse } from '../types/CompanyShop.type';
import { Position } from './Position.model';

export class CompanyShop {
  industrialAreaId: number;
  company: {
    id: number;
    name: string;
    owner: string;
  };
  location: Position;
  offers: CompanyShopItem[];

  constructor({ industrial_area_id, company, pos, shops }: CompanyShopResponse) {
    this.industrialAreaId = industrial_area_id;
    this.company = company;
    this.location = new Position(pos);
    this.offers = shops.map((item) => new CompanyShopItem(item));
  }
}

export class CompanyShopItem {
  name: string;
  className: string;
  amount: number;
  price: number;

  constructor({ amount, item, item_localized, price }: CompanyShopItemResponse) {
    this.name = item_localized;
    this.className = item;
    this.amount = amount;
    this.price = price;
  }
}
