import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator, Divider, List, Text} from 'react-native-paper';
import {formatter} from '../../services/CurrencyFormat.service';
import {Accordion, AccordionProps} from '../Accordion/Accordion.component';
import {ShopCar, ShopItem, ShopType} from '../../models';
import {useTranslation} from 'react-i18next';

export type TraderOffersProps = {
  shop: ShopType;
} & Pick<AccordionProps, 'isExpanded' | 'isLast' | 'isFirst'>;

export const TraderOffers: React.FC<TraderOffersProps> = ({shop, isFirst, isExpanded, isLast}) => {
  const {t} = useTranslation();
  const id = React.useId();
  const [offers, setOffers] = React.useState<ShopCar[] | ShopItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!isExpanded) return;
    shop
      .getOffers()
      .then(setOffers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [shop, isExpanded]);

  return (
    <Accordion
      id={shop.type}
      title={shop.name}
      isFirst={isFirst}
      isLast={isLast}
      isExpanded={isExpanded}
      surfaceStyle={{paddingHorizontal: 0, paddingVertical: 0}}
      divider>
      {loading ? (
        <View style={{padding: 16}}>
          <ActivityIndicator animating />
        </View>
      ) : (
        <List.Section>
          {offers.map((offer, index) => (
            <React.Fragment key={id + '-market-' + offer.id}>
              {index !== 0 && <Divider />}
              <List.Item
                title={offer.name}
                description={
                  offer instanceof ShopCar
                    ? `${t('trader.offer_component.capacity', {value: offer.vSpace})}\n${t(
                        'trader.offer_component.level',
                        {level: offer.level},
                      )}`
                    : t('trader.offer_component.level', {level: offer.level})
                }
                right={() => (
                  <View style={{display: 'flex', justifyContent: 'center'}}>
                    <Text>{formatter.format(offer.price)}</Text>
                  </View>
                )}
              />
            </React.Fragment>
          ))}
        </List.Section>
      )}
    </Accordion>
  );
};
