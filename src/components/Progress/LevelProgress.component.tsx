import React from 'react';
import {type ProgressProps} from './Progress.component';
import {View} from 'react-native';
import {Surface, Text, useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

export type LevelProgressProps = Omit<ProgressProps, 'withLabel' | 'currentLevel'> & {currentLevel: number};

export const LevelProgress: React.FC<LevelProgressProps> = ({currentLevel, progress}) => {
  const theme = useTheme();
  const {t} = useTranslation();
  return (
    <React.Fragment>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text variant="labelMedium">{t('profile.player_screen.level', {level: currentLevel})}</Text>
        <Text variant="labelMedium">{t('profile.player_screen.level', {level: currentLevel + 1})}</Text>
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
