import React from 'react';
import {List, Searchbar, useTheme} from 'react-native-paper';
import {NoResults} from '../components/NoResults';
import {TraderOffers} from '../components/TraderOffers';
import type {ShopCategory} from '../types';
import {ShopType} from '../models';
import {PanthorService} from '../services/Panthor.service';
import {StoreContext} from '../context/Store.context';
import {ScreenDetails} from '../types/ScreenDetails.type';
import ScreenWrapper from '../ScreenWrapper';
import {ScreenActivityIndicator} from '../components/ScreenActivityIndicator.component';

export type TraderScreenProps = {
  category: ShopCategory;
};

const TraderScreen: React.FC<TraderScreenProps> = ({category}) => {
  const theme = useTheme();
  const {loading, setLoading, refreshing, setRefreshing, traders, setTraders} = React.useContext(StoreContext);
  const [currentTrader, setCurrentTrader] = React.useState<ShopType['type']>('');
  const [keyword, setKeyword] = React.useState('');

  const handler = {
    fetchData: async function () {
      const traderList = await PanthorService.getShopTypes(category);
      setTraders(prev => ({...prev, [category]: traderList}));
    },
    onRefresh: () => {
      setRefreshing(true);
      handler.fetchData().finally(() => setRefreshing(false));
    },
    onAccordionPress: (expandedId: number | string) => {
      setCurrentTrader(expandedId === currentTrader ? '' : String(expandedId));
    },
  };

  const displayedTraders = React.useMemo(() => {
    const lowerKeyword = keyword.toLowerCase();
    return traders[category].filter(trader => trader.name.toLowerCase().includes(lowerKeyword));
  }, [traders, keyword]);

  React.useEffect(() => {
    setLoading(true);
    handler.fetchData().finally(() => setLoading(false));

    return () => {
      setKeyword('');
    };
  }, [category]);

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
        mode="bar"
        placeholder="Suchen"
        value={keyword}
        onChangeText={setKeyword}
        elevation={2}
        style={{backgroundColor: theme.colors.elevation.level1, marginBottom: 16}}
      />

      {displayedTraders.length > 0 ? (
        <List.AccordionGroup expandedId={currentTrader} onAccordionPress={handler.onAccordionPress}>
          {displayedTraders.map((shop, index, arr) => (
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
        <NoResults />
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
