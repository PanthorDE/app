import type {PositionResponse} from './Position.type';

export type CompanyShopItemResponse = {
  item: string;
  item_localized: string;
  amount: number;
  price: number;
};

export type CompanyShopResponse = {
  industrial_area_id: number;
  company: {
    id: number;
    name: string;
    owner: string;
  };
  pos: PositionResponse;
  shops: CompanyShopItemResponse[];
};
