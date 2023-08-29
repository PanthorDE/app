import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

export type ChangeProps = {
  change: string;
};

export const Change: React.FC<ChangeProps> = ({change}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.dot}>{'\u2022'}</Text>
      <Text>{change}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  dot: {
    marginRight: 8,
  },
});
