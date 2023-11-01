import React from 'react';
import {Card, List} from 'react-native-paper';
import {NoResults} from '../NoResults';
import {MarketItem} from './MarketItem.component';
import {MarketItem as MarketItemModel} from '../../models';

export type MarketWrapperProps = {
  items: MarketItemModel[];
  policeOnlineCount?: number;
};

export const MarketWrapper: React.FC<MarketWrapperProps> = ({items}) => {
  if (items.length === 0) return <NoResults />;
  return (
    <Card>
      <List.Section>
        {items.map((item, index) => (
          <MarketItem key={item.item} item={item} withDivider={index !== 0} />
        ))}
      </List.Section>
    </Card>
  );
};
