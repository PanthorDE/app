import React from 'react';
import {CompanyShop as CompanyShopModel} from '../../models';
import {Accordion, type AccordionProps} from '../Accordion';
import {Linking, View} from 'react-native';
import {Button, List, Text} from 'react-native-paper';
import {formatter} from '../../services';
import {ItemIcon} from '../Icon';
import {useTranslation} from 'react-i18next';

export type CompanyShopProps = {
  company: CompanyShopModel;
} & Pick<AccordionProps, 'isFirst' | 'isLast' | 'isExpanded'>;

export const CompanyShop: React.FC<CompanyShopProps> = ({
  company: {company, location, offers, industrialAreaId},
  isFirst,
  isLast,
  isExpanded,
}) => {
  const {t} = useTranslation();
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
          {t('company.shop.open_map')}
        </Button>
      </View>

      {offers.length > 0 && (
        <List.Section>
          {offers.map(offer => (
            <List.Item
              key={offer.className}
              title={offer.name}
              description={t('company.shop.item_amount', {amount: offer.amount})}
              left={() => <ItemIcon item={offer.className} />}
              right={() => <Text>{formatter.format(offer.price)}</Text>}
            />
          ))}
        </List.Section>
      )}
    </Accordion>
  );
};
