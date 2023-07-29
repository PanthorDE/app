import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Button, Chip, Text } from 'react-native-paper';

import { Accordion, AccordionProps } from '../Accordion/Accordion.component';
import { Building as BuildingModel, BuildingDTO } from '../../models';

export type BuildingProps = {
  building: BuildingModel | BuildingDTO;
} & Pick<AccordionProps, 'isFirst' | 'isLast' | 'isExpanded'>;

export const Building: React.FC<BuildingProps> = ({ building, isFirst, isLast, isExpanded }) => {
  return (
    <Accordion
      id={building.id}
      title={'Baustelle ' + building.id}
      description={<View>{building.disabled && <Chip compact>Inaktiv</Chip>}</View>}
      isFirst={isFirst}
      isLast={isLast}
      isExpanded={isExpanded}
      divider
    >
      <View style={style.col}>
        <Text variant="labelMedium">Position</Text>
        <Button icon="map" onPress={() => Linking.openURL(building.getPosition().getMapUrl())}>
          Karte aufrufen
        </Button>
      </View>
      <View style={style.col}>
        <Text variant="labelMedium">Typ</Text>
        <Text>{building.classname}</Text>
      </View>
      <View style={style.col}>
        <Text variant="labelMedium">Stufe</Text>
        <Text>{building.stage}</Text>
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
