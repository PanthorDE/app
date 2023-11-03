import {format} from 'date-fns';
import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {Button, Chip, Text} from 'react-native-paper';
import {Accordion, AccordionProps} from '../Accordion/Accordion.component';
import {House as HouseModel, HouseDTO} from '../../models';
import {useTranslation} from 'react-i18next';

export type HouseProps = {
  house: HouseModel | HouseDTO;
} & Pick<AccordionProps, 'isFirst' | 'isLast' | 'isExpanded'>;

export const House: React.FC<HouseProps> = ({house, isFirst, isLast, isExpanded}) => {
  const {t} = useTranslation();
  return (
    <Accordion
      id={house.id}
      title={t('profile.house_screen.house', {house: house.id})}
      description={
        <View>
          {house.disabled ? (
            <Text variant="labelMedium">{t('profile.house_screen.inactive')}</Text>
          ) : (
            <Text variant="labelMedium">{t('profile.house_screen.time_remaining', {time: house.payed_for / 24})}</Text>
          )}
        </View>
      }
      isFirst={isFirst}
      isLast={isLast}
      isExpanded={isExpanded}
      divider>
      <View style={style.row}>
        <View style={style.col}>
          <Button icon="map" onPress={() => Linking.openURL(house.getPosition().getMapUrl())}>
            {t('profile.house_screen.open_map')}
          </Button>
        </View>
        <View style={style.col}>
          <Text variant="labelMedium">{t('profile.house_screen.maintenance_label')}</Text>
          <Text>
            {t('profile.house_screen.maintenance_value', {time: format(house.active_until, 'dd.MM.yy, HH:mm')})}
          </Text>
        </View>
        {house instanceof HouseModel && (
          <View style={[style.col, {minWidth: '100%'}]}>
            <Text variant="labelMedium">{t('profile.house_screen.players_label')}</Text>
            {house.players.length > 0 &&
              house.players.map(player => (
                <Chip key={player} style={{marginRight: 8, marginBottom: 8}} compact>
                  {player}
                </Chip>
              ))}
          </View>
        )}
      </View>
    </Accordion>
  );
};

const style = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 16,
    columnGap: 16,
  },
  col: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});
