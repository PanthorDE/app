import React from 'react';
import {ScreenDetails} from '../types/ScreenDetails.type';
import TraderScreen from './Trader.screen';

export type VehicleTraderProps = {};

const VehicleTraderScreen: React.FC<VehicleTraderProps> = () => {
  return <TraderScreen category="vehicles" />;
};

export default VehicleTraderScreen;

export const VehicleTraderScreenDetails: ScreenDetails<VehicleTraderProps> = {
  name: 'VehicleTrader',
  label: 'Fahrzeughändler',
  label_key: 'trader.vehicle_trader_screen.title',
  icon: 'car-info',
  component: VehicleTraderScreen,
};
