import {format} from 'date-fns';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Chip, Text} from 'react-native-paper';
import {Accordion, AccordionProps} from '../Accordion/Accordion.component';
import {Rental as RentalModel} from '../../models';
import {useTranslation} from 'react-i18next';

export type RentalProps = {
  rental: RentalModel;
} & Pick<AccordionProps, 'isFirst' | 'isLast' | 'isExpanded'>;

export const Rental: React.FC<RentalProps> = ({rental, isFirst, isLast, isExpanded}) => {
  const {t} = useTranslation();
  return (
    <Accordion
      id={rental.id}
      title={t('profile.house_screen.rental', {appartment: rental.id})}
      description={
        <View>
          {rental.disabled ? (
            <Chip compact>{t('profile.house_screen.inactive')}</Chip>
          ) : (
            <Chip compact>{t('profile.house_screen.time_remaining', {time: rental.payed_for / 24})}</Chip>
          )}
        </View>
      }
      isFirst={isFirst}
      isLast={isLast}
      isExpanded={isExpanded}
      divider>
      <View style={style.col}>
        <Text variant="labelMedium">{t('profile.house_screen.rented_until')}</Text>
        <Text>
          {t('profile.house_screen.rented_until_value', {time: format(rental.active_until, 'dd.MM.yy, HH:mm')})}
        </Text>
      </View>
    </Accordion>
  );
};

const style = StyleSheet.create({
  col: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});
