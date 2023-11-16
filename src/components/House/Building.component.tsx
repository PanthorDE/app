import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {Button, Chip, Text} from 'react-native-paper';
import {Accordion, AccordionProps} from '../Accordion/Accordion.component';
import {Building as BuildingModel, BuildingDTO} from '../../models';
import {useTranslation} from 'react-i18next';

export type BuildingProps = {
  building: BuildingModel | BuildingDTO;
} & Pick<AccordionProps, 'isFirst' | 'isLast' | 'isExpanded'>;

export const Building: React.FC<BuildingProps> = ({building, isFirst, isLast, isExpanded}) => {
  const {t} = useTranslation();
  return (
    <Accordion
      id={building.id}
      title={t('profile.house_screen.construction', {construction: building.id})}
      description={<View>{building.disabled && <Chip compact>Inaktiv</Chip>}</View>}
      isFirst={isFirst}
      isLast={isLast}
      isExpanded={isExpanded}
      divider>
      <View style={style.col}>
        <Button icon="map" onPress={() => Linking.openURL(building.getPosition().getMapUrl())}>
          {t('profile.house_screen.open_map')}
        </Button>
      </View>
      <View style={style.col}>
        <Text variant="labelMedium">{t('profile.house_screen.construction_type')}</Text>
        <Text>{building.classname}</Text>
      </View>
      <View style={style.col}>
        <Text variant="labelMedium">{t('profile.house_screen.construction_stage')}</Text>
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
