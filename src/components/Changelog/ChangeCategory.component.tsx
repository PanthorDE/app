import React from 'react';
import {Changelog} from '../../models';
import {View, type ViewProps} from 'react-native';
import {Text} from 'react-native-paper';
import {Change} from './Change.component';

export type ChangeCategoryProps = {
  title: string;
  changes: Changelog['changeMap'] | Changelog['changeMission'] | Changelog['changeMod'];
  style?: ViewProps['style'];
};

export const ChangeCategory: React.FC<ChangeCategoryProps> = ({title, changes, style}) => {
  const id = React.useId();
  return (
    <View>
      <Text variant="titleSmall" style={[{marginTop: 16}, style]}>
        {title}
      </Text>
      <View>
        {changes.map((change, idx) => (
          <Change key={`${id}-${title.toLowerCase()}-${idx}`} change={change} />
        ))}
      </View>
    </View>
  );
};
