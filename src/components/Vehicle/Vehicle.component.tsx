import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {Vehicle as CVehicle} from '../../models';
import {Accordion, AccordionProps} from '../Accordion';
import {Progress} from '../Progress/Progress.component';

export type VehicleProps = {
  vehicle: CVehicle;
} & Pick<AccordionProps, 'isFirst' | 'isLast' | 'isExpanded'>;

export const Vehicle: React.FC<VehicleProps> = ({vehicle, isFirst, isLast, isExpanded}) => {
  return (
    <Accordion
      id={vehicle.id}
      title={vehicle.vehicle_data.name}
      description={vehicle.side.getLabel()}
      isFirst={isFirst}
      isLast={isLast}
      isExpanded={isExpanded}
      divider>
      <View style={style.row}>
        <View style={style.col}>
          <Text variant="labelMedium">Fraktion</Text>
          <Text>{vehicle.side.getLabel()}</Text>
        </View>
        <View style={style.col}>
          <Text variant="labelMedium">Kennzeichen</Text>
          <Text>{vehicle.plate}</Text>
        </View>
        <View style={style.col}>
          <Text variant="labelMedium">Kilometerstand</Text>
          <Text>{vehicle.kilometer_total} km</Text>
        </View>
        <View style={[style.col, {minWidth: '100%'}]}>
          <Text variant="labelMedium">Tank</Text>
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
