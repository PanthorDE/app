import React from 'react';
import {CompanyShop as CompanyShopModel} from '../../models';
import {Accordion, type AccordionProps} from '../Accordion';
import {Linking, View} from 'react-native';
import {Avatar, Button, List, Text} from 'react-native-paper';
import {formatter} from '../../services';
import {ItemIcon} from '../Icon';

export type CompanyShopProps = {
  company: CompanyShopModel;
} & Pick<AccordionProps, 'isFirst' | 'isLast' | 'isExpanded'>;

export const CompanyShop: React.FC<CompanyShopProps> = ({
  company: {company, location, offers, industrialAreaId},
  isFirst,
  isLast,
  isExpanded,
}) => {
  return (
    <Accordion
      id={industrialAreaId}
      title={company.name}
      description={company.owner}
      isFirst={isFirst}
      isLast={isLast}
      isExpanded={isExpanded}
      surfaceStyle={{paddingHorizontal: 0, paddingVertical: 0}}
      divider>
      <View style={{padding: 16}}>
        <Button icon="map" onPress={() => Linking.openURL(location.getMapUrl())}>
          Karte aufrufen
        </Button>
      </View>

      {offers.length > 0 && (
        <List.Section>
          {offers.map(offer => (
            <List.Item
              key={offer.className}
              title={offer.name}
              description={offer.amount + ' Stück'}
              left={() => <ItemIcon item={offer.className} />}
              right={() => <Text>{formatter.format(offer.price)}</Text>}
            />
          ))}
        </List.Section>
      )}
    </Accordion>
  );
};
