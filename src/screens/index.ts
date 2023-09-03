import type {ScreenDetails} from '../types/ScreenDetails.type';
import {ChangelogScreenDetails} from './Changelog.screen';
import {CompanyScreenDetails} from './Company.screen';
import {HomeScreenDetails} from './Home.screen';
import {MarketScreenDetails} from './Market.screen';
import {PlayerProfileNavigationDetails} from './PlayerProfileNavigation.screen';
import {SettingsScreenDetails} from './Settings.screen';
import {TraderNavigationDetails} from './TraderNavigation.screen';

/**
 * Order of item is relevant for order of DrawerItems
 */
export const Screens: ScreenDetails<any>[] = [
  HomeScreenDetails,
  PlayerProfileNavigationDetails,
  MarketScreenDetails,
  CompanyScreenDetails,
  TraderNavigationDetails,
  ChangelogScreenDetails,
  SettingsScreenDetails,
];
