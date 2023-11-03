import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {Vehicle as CVehicle} from '../../models';
import {Accordion, AccordionProps} from '../Accordion';
import {Progress} from '../Progress/Progress.component';
import {useTranslation} from 'react-i18next';

export type VehicleProps = {
  vehicle: CVehicle;
} & Pick<AccordionProps, 'isFirst' | 'isLast' | 'isExpanded'>;

export const Vehicle: React.FC<VehicleProps> = ({vehicle, isFirst, isLast, isExpanded}) => {
  const {t} = useTranslation();
  return (
    <Accordion
      id={vehicle.id}
      title={vehicle.vehicle_data.name}
      description={t(vehicle.side.getLabel())}
      isFirst={isFirst}
      isLast={isLast}
      isExpanded={isExpanded}
      divider>
      <View style={style.row}>
        <View style={style.col}>
          <Text variant="labelMedium">{t('profile.garage_screen.side')}</Text>
          <Text>{t(vehicle.side.getLabel())}</Text>
        </View>
        <View style={style.col}>
          <Text variant="labelMedium">{t('profile.garage_screen.plate')}</Text>
          <Text>{vehicle.plate}</Text>
        </View>
        <View style={style.col}>
          <Text variant="labelMedium">{t('profile.garage_screen.mileage')}</Text>
          <Text>{t('profile.garage_screen.mileage_value', {value: vehicle.kilometer_total})}</Text>
        </View>
        <View style={[style.col, {minWidth: '100%'}]}>
          <Text variant="labelMedium">{t('profile.garage_screen.fuel_left')}</Text>
          <Progress progress={vehicle.fuel * 100} />
        </View>
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
    display: 'flex',
    flexGrow: 1,
  },
});
