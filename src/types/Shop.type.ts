export type ShopCategory = 'items' | 'vehicles';

export type ShopTypeResponse = {
  shoptype: string;
  shopname: string;
};

export type ShopItemResponse = {
  id: number;
  price: number;
  classname: string;
  category: string;
  level: number;
  shopname: string;
  shoptype: string;
  name: string;
};

export type ShopCarResponse = Omit<ShopItemResponse, 'category'> & {
  v_space: number;
  type: string;
};
