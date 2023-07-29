import React from 'react';
import {
  Changelog,
  MarketItem,
  Profile,
  RpgServer,
  Server,
  ShopCar,
  CompanyShop,
  ShopItem,
  ShopType,
  Vehicle,
} from '../models';
import type { ShopCategory } from '../types';
import { PanthorService } from '../services/Panthor.service';
import { ApiKeyService } from '../services';

export interface IStoreContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<IStoreContext['loading']>>;
  refreshing: boolean;
  setRefreshing: React.Dispatch<React.SetStateAction<IStoreContext['refreshing']>>;
  checking: boolean;
  setChecking: React.Dispatch<React.SetStateAction<IStoreContext['checking']>>;
  authentificated: boolean;
  apiKey: string | null;
  setApiKey: React.Dispatch<React.SetStateAction<IStoreContext['apiKey']>>;
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<IStoreContext['profile']>>;
  changelogs: Changelog[];
  setChangelogs: React.Dispatch<React.SetStateAction<IStoreContext['changelogs']>>;
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<IStoreContext['vehicles']>>;
  servers: RpgServer[] | Server[];
  setServers: React.Dispatch<React.SetStateAction<IStoreContext['servers']>>;
  selectedServer: RpgServer | Server | null;
  setSelectedServer: React.Dispatch<React.SetStateAction<IStoreContext['selectedServer']>>;
  marketItems: MarketItem[];
  setMarketItems: React.Dispatch<React.SetStateAction<IStoreContext['marketItems']>>;
  traders: Record<ShopCategory, ShopType[]>;
  setTraders: React.Dispatch<React.SetStateAction<IStoreContext['traders']>>;
  cachedTraderOffers: Record<ShopCategory, Record<ShopType['type'], ShopItem[] | ShopCar[]>>;
  setCachedTraderOffers: React.Dispatch<React.SetStateAction<IStoreContext['cachedTraderOffers']>>;
  companyShops: CompanyShop[];
  setCompanyShops: React.Dispatch<React.SetStateAction<IStoreContext['companyShops']>>;
}

export const StoreContext = React.createContext({} as IStoreContext);

export const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = React.useState<IStoreContext['loading']>(false);
  const [refreshing, setRefreshing] = React.useState<IStoreContext['refreshing']>(false);
  const [checking, setChecking] = React.useState(true);
  const [apiKey, setApiKey] = React.useState<IStoreContext['apiKey']>(null);
  const [profile, setProfile] = React.useState<IStoreContext['profile']>(null);
  const [changelogs, setChangelogs] = React.useState<IStoreContext['changelogs']>([]);
  const [vehicles, setVehicles] = React.useState<IStoreContext['vehicles']>([]);
  const [servers, setServers] = React.useState<IStoreContext['servers']>([]);
  const [selectedServer, setSelectedServer] = React.useState<IStoreContext['selectedServer']>(null);
  const [marketItems, setMarketItems] = React.useState<IStoreContext['marketItems']>([]);
  const [companyShops, setCompanyShops] = React.useState<IStoreContext['companyShops']>([]);
  const [traders, setTraders] = React.useState<IStoreContext['traders']>({
    items: [],
    vehicles: [],
  });
  const [cachedTraderOffers, setCachedTraderOffers] = React.useState<
    Record<ShopCategory, Record<ShopType['type'], ShopItem[] | ShopCar[]>>
  >({
    items: {},
    vehicles: {},
  });

  const authentificated = React.useMemo(() => {
    return apiKey !== null && apiKey.length > 1;
  }, [apiKey, profile]);

  React.useLayoutEffect(() => {
    setChecking(true);
    ApiKeyService.retrive()
      .then(setApiKey)
      .catch(() => setApiKey(null))
      .finally(() => setChecking(false));
  }, []);

  React.useEffect(() => {
    setLoading(true);
    if (apiKey) {
      PanthorService.getProfile(apiKey)
        .then((data) => setProfile(data))
        .catch(() => setProfile(null))
        .finally(() => setLoading(false));
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [apiKey]);

  return (
    <StoreContext.Provider
      value={React.useMemo(
        () => ({
          loading,
          setLoading,
          refreshing,
          setRefreshing,
          checking,
          setChecking,
          authentificated: authentificated,
          apiKey,
          setApiKey,
          profile,
          setProfile,
          changelogs,
          setChangelogs,
          vehicles,
          setVehicles,
          servers,
          setServers,
          selectedServer,
          setSelectedServer,
          marketItems,
          setMarketItems,
          traders,
          setTraders,
          cachedTraderOffers,
          setCachedTraderOffers,
          companyShops,
          setCompanyShops,
        }),
        [
          loading,
          refreshing,
          checking,
          authentificated,
          apiKey,
          profile,
          changelogs,
          vehicles,
          servers,
          selectedServer,
          marketItems,
          traders,
          cachedTraderOffers,
          companyShops,
        ]
      )}
    >
      {children}
    </StoreContext.Provider>
  );
};
