import * as React from 'react';
import { ActivityIndicator, Card } from 'react-native-paper';
import ScreenWrapper from '../ScreenWrapper';
import { ScreenDetails } from '../types/ScreenDetails.type';
import { StoreContext } from '../context/Store.context';
import { MarketItem as MarketItemModel, RpgServer } from '../models';
import { ItemBonus, Market, PriceCalculation, type PriceCalculationProps } from '../components/Market';
import { View } from 'react-native';
import { PanthorService } from '../services/Panthor.service';
import { differenceInSeconds } from 'date-fns';

export type MarketScreenProps = {};

export const MarketScreen: React.FC<MarketScreenProps> = () => {
  const { loading, setLoading, refreshing, setRefreshing, servers, setServers } = React.useContext(StoreContext);
  const [items, setItems] = React.useState<MarketItemModel[]>([]);
  const [refreshInterval, setRefreshInterval] = React.useState<PriceCalculationProps>({
    date: new Date(),
    interval: 0,
  });

  const policeOnlineCount = React.useMemo(() => {
    return servers[0] instanceof RpgServer ? servers[0].cops : 0;
  }, [servers]);

  const handler = {
    fetchData: async () => {
      try {
        const [market, fetchedServers] = await Promise.all([PanthorService.getMarket(1), PanthorService.getServers()]);
        if (market.length >= 1) {
          const [newer, older] = await market[0].getPriceBacklog(1, 2);
          setRefreshInterval({
            date: newer.createdAt,
            interval: differenceInSeconds(newer.createdAt, older.createdAt),
          });
        }

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
    return (
      <View style={{ padding: 16 }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScreenWrapper
      contentContainerStyle={{ padding: 16 }}
      refreshControl={{
        refreshing: refreshing,
        onRefresh: handler.onRefresh,
      }}
    >
      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', flex: 1, columnGap: 8, marginBottom: 8 }}>
        {!loading && <ItemBonus copAmount={policeOnlineCount} />}
        {!loading && refreshInterval.interval > 0 && <PriceCalculation {...refreshInterval} />}
      </View>

      {!loading && (
        <Card>
          <Market.Wrapper items={items} policeOnlineCount={policeOnlineCount} />
        </Card>
      )}
    </ScreenWrapper>
  );
};

export const MarketScreenDetails: ScreenDetails<MarketScreenProps> = {
  name: 'Market',
  label: 'Markt',
  icon: 'finance',
  component: MarketScreen,
};
