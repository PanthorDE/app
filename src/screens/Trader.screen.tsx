import React from 'react';
import { ActivityIndicator, List } from 'react-native-paper';
import { NoResults } from '../components/NoResults';
import { TraderOffers } from '../components/TraderOffers';
import type { ShopCategory } from '../types';
import { ShopType } from '../models';
import { PanthorService } from '../services/Panthor.service';
import { View } from 'react-native';
import { StoreContext } from '../context/Store.context';
import { ScreenDetails } from '../types/ScreenDetails.type';
import ScreenWrapper from '../ScreenWrapper';

export type TraderScreenProps = {
  category: ShopCategory;
};

const TraderScreen: React.FC<TraderScreenProps> = ({ category }) => {
  const { loading, setLoading, refreshing, setRefreshing, traders, setTraders } = React.useContext(StoreContext);
  const [currentTrader, setCurrentTrader] = React.useState<ShopType['type'] | null>(null);

  const handler = {
    fetchData: async function () {
      const traderList = await PanthorService.getShopTypes(category);
      setTraders((prev) => ({ ...prev, [category]: traderList }));
    },
    onRefresh: () => {
      setRefreshing(true);
      handler.fetchData().finally(() => setRefreshing(false));
    },
    onAccordionPress: (expandedId: number | string) => {
      setCurrentTrader(expandedId === currentTrader ? null : String(expandedId));
    },
  };

  React.useEffect(() => {
    setLoading(true);
    handler.fetchData().finally(() => setLoading(false));
  }, [category]);

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
      {traders[category].length > 0 ? (
        <List.AccordionGroup expandedId={currentTrader} onAccordionPress={handler.onAccordionPress}>
          {traders[category].map((shop, index, arr) => (
            <React.Fragment key={shop.type}>
              <TraderOffers
                shop={shop}
                isFirst={index === 0}
                isLast={index === arr.length - 1}
                isExpanded={currentTrader === shop.type}
              />
            </React.Fragment>
          ))}
        </List.AccordionGroup>
      ) : (
        <NoResults message="Keine Händler gefunden" reason="NO_RESULTS" />
      )}
    </ScreenWrapper>
  );
};

export default TraderScreen;

export const GarageScreenDetails: ScreenDetails<TraderScreenProps> = {
  name: 'Trader',
  label: 'Händler',
  icon: 'garage',
  component: TraderScreen,
};
