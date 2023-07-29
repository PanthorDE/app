import * as React from 'react';
import { ScreenDetails } from '../types/ScreenDetails.type';
import TraderScreen from './Trader.screen';

export type ItemTraderProps = {};

const ItemTraderScreen: React.FC<ItemTraderProps> = () => {
  return <TraderScreen category="items" />;
};

export default ItemTraderScreen;

export const ItemTraderScreenDetails: ScreenDetails<ItemTraderProps> = {
  name: 'ItemTrader',
  label: 'Item-Händler',
  icon: 'information',
  component: ItemTraderScreen,
};
