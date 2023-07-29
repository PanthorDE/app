import { Panthor } from '../constants/panthor.constant';
import { type ShopCategory, type ShopTypeResponse, type ShopItemResponse, type ShopCarResponse } from '../types';

export class ShopType {
  category: ShopCategory;
  type: string;
  name: string;

  constructor(category: ShopCategory, { shoptype, shopname }: ShopTypeResponse) {
    this.category = category;
    this.type = shoptype;
    this.name = shopname;
  }

  async getOffers(): Promise<ShopItem[] | ShopCar[]> {
    try {
      const response = await fetch(`${Panthor.apiBaseUrl}/v1/info/${this.category}/${this.type}`);
      const json = await response.json();
      return this.category === 'items'
        ? json.data.map((item: ShopItemResponse) => new ShopItem(item))
        : json.data.map((car: ShopCarResponse) => new ShopCar(car));
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export class ShopItem {
  id: number;
  price: number;
  classname: string;
  category: string;
  level: number;
  shopname: string;
  shoptype: string;
  name: string;

  constructor(data: ShopItemResponse) {
    this.id = data.id;
    this.price = data.price;
    this.classname = data.classname;
    this.category = data.category;
    this.level = data.level;
    this.shopname = data.shopname;
    this.shoptype = data.shoptype;
    this.name = data.name;
  }
}

export class ShopCar extends ShopItem {
  vSpace: number;
  type: string;

  constructor(data: ShopCarResponse) {
    super({ ...data, category: '' }); // FIXME: Find a actual solution for the non-existent `category`-attr on ShopCar
    this.vSpace = data.v_space;
    this.type = data.type;
  }
}
