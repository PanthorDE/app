import React from 'react';
import {type ProgressProps} from './Progress.component';
import {View} from 'react-native';
import {Surface, Text, useTheme} from 'react-native-paper';

export type LevelProgressProps = Omit<ProgressProps, 'withLabel' | 'currentLevel'> & {currentLevel: number};

export const LevelProgress: React.FC<LevelProgressProps> = ({currentLevel, progress}) => {
  const theme = useTheme();
  return (
    <React.Fragment>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text variant="labelMedium">Level {currentLevel}</Text>
        <Text variant="labelMedium">Level {currentLevel + 1}</Text>
      </View>
      <Surface
        style={{
          width: '100%',
          height: 20,
          backgroundColor: theme.colors.primaryContainer,
          borderRadius: theme.roundness,
        }}>
        <View
          style={{
            width: `${progress}%`,
            height: 20,
            borderRadius: theme.roundness,
            backgroundColor: theme.colors.primary,
          }}></View>
      </Surface>
    </React.Fragment>
  );
};
