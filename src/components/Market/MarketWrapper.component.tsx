import React from 'react';
import {List} from 'react-native-paper';
import {NoResults} from '../NoResults';
import {MarketItem} from './MarketItem.component';
import {MarketItem as MarketItemModel, CopBonus} from '../../models';

export type MarketWrapperProps = {
  items: MarketItemModel[];
  policeOnlineCount?: number;
};

export const MarketWrapper: React.FC<MarketWrapperProps> = ({items, policeOnlineCount = undefined}) => {
  const priceMultiplier = React.useMemo(() => {
    if (policeOnlineCount === undefined) return undefined;
    return new CopBonus(policeOnlineCount).determineMultiplicator();
  }, [policeOnlineCount]);

  if (items.length === 0) return <NoResults message="Marktpreise konnten nicht abgerufen werden" reason="NO_RESULTS" />;
  return (
    <List.Section>
      {items.map((item, index) => (
        <MarketItem
          key={item.item}
          item={item}
          priceMultiplicator={item.isIllegal() ? priceMultiplier : undefined}
          withDivider={index !== 0}
        />
      ))}
    </List.Section>
  );
};
