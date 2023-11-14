import React from 'react';
import {View} from 'react-native';
import {Switch, type SwitchProps, Text} from 'react-native-paper';

export type SwitchLabelProps = SwitchProps & {label: string};

export const SwitchLabel: React.FC<SwitchLabelProps> = ({label, ...switchProps}) => {
  return (
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text>{label}</Text>
      <Switch {...switchProps} />
    </View>
  );
};
