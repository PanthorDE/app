import React from 'react';
import {View} from 'react-native';
import {Divider, List, Text} from 'react-native-paper';
import {formatter} from '../../services';
import {MarketItem as MarketItemModel, CopBonus} from '../../models';
import {ItemIcon} from '../Icon';

export type MarketItemProps = {
  item: MarketItemModel;
  priceMultiplicator?: number;
  withDivider?: boolean;
};

export const MarketItem: React.FC<MarketItemProps> = ({item, priceMultiplicator, withDivider}) => {
  return (
    <React.Fragment>
      {withDivider ? <Divider /> : null}
      <List.Item
        title={item.localized}
        left={() => <ItemIcon item={item.item} />}
        right={() => (
          <View style={{display: 'flex', justifyContent: 'center'}}>
            <Text>{formatter.format(item.price)}</Text>
            {priceMultiplicator && (
              <Text variant="labelSmall" style={{textAlign: 'right'}}>
                {formatter.format(CopBonus.calculatePrice(item.price, priceMultiplicator))}
              </Text>
            )}
          </View>
        )}
      />
    </React.Fragment>
  );
};
