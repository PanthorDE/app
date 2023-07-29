export type MarketItemResponse = {
  item: string;
  price: number;
  server: number;
  updated_at: string;
  created_at: string;
  localized: string;
  export_virt_item?: {
    item: string;
    name: string;
    sellPrice: number;
    buyPrice: number;
    illegal: number;
    exp: number;
    weight: number;
    market: number;
    icon: string;
  };
};

export type ItemBacklogResponse = {
  id: number;
  item: string;
  price: number;
  server_id: number;
  created_at: string;
};
