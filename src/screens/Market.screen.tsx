import React from 'react';
import {Searchbar, useTheme} from 'react-native-paper';
import ScreenWrapper from '../ScreenWrapper';
import {ScreenDetails} from '../types/ScreenDetails.type';
import {StoreContext} from '../context/Store.context';
import {MarketItem as MarketItemModel} from '../models';
import {Market} from '../components/Market';
import {PanthorService} from '../services/Panthor.service';
import {ScreenActivityIndicator} from '../components/ScreenActivityIndicator.component';
import {useTranslation} from 'react-i18next';

export type MarketScreenProps = {};

export const MarketScreen: React.FC<MarketScreenProps> = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {loading, setLoading, refreshing, setRefreshing, servers, setServers} = React.useContext(StoreContext);
  const [items, setItems] = React.useState<MarketItemModel[]>([]);
  const [searchBy, setSearchBy] = React.useState('');

  const displayedItems: MarketItemModel[] = React.useMemo(() => {
    if (searchBy.length === 0) return items;
    return items.filter(item => item.localized.toLowerCase().includes(searchBy.toLowerCase()));
  }, [searchBy, items]);

  const handler = {
    onItemSearch: (keyword: string) => {
      setSearchBy(keyword);
    },
    fetchData: async () => {
      try {
        const [market, fetchedServers] = await Promise.all([PanthorService.getMarket(1), PanthorService.getServers()]);
        setItems(market);
        setServers(fetchedServers);
      } catch (error) {
        console.error(error);
        // FIXME: Add error-handling
      }
    },
    onRefresh: () => {
      setRefreshing(true);
      handler.fetchData().finally(() => setRefreshing(false));
    },
  };

  React.useEffect(() => {
    if (servers.length > 0) return;
    PanthorService.getServers().then(setServers).catch(console.error);
  }, [servers]);

  React.useEffect(() => {
    setLoading(true);
    handler.fetchData().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ScreenActivityIndicator />;
  }

  return (
    <ScreenWrapper
      contentContainerStyle={{padding: 16}}
      refreshControl={{
        refreshing: refreshing,
        onRefresh: handler.onRefresh,
      }}>
      <Searchbar
        placeholder={t('market.screen.search_placeholder')}
        onChangeText={handler.onItemSearch}
        value={searchBy}
        style={{backgroundColor: theme.colors.elevation.level1, marginBottom: 16}}
        elevation={2}
        loading={loading || refreshing}
      />

      {!loading && <Market.Wrapper items={displayedItems} policeOnlineCount={undefined} />}
    </ScreenWrapper>
  );
};

export const MarketScreenDetails: ScreenDetails<MarketScreenProps> = {
  name: 'Market',
  label: 'Markt',
  label_key: 'market.screen.title',
  icon: 'finance',
  component: MarketScreen,
};
