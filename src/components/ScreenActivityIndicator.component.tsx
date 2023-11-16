import React from 'react';
import {type ViewProps, View} from 'react-native';
import {type ActivityIndicatorProps, ActivityIndicator, useTheme} from 'react-native-paper';

export type ScreenActivityIndicatorProps = {
  view?: ViewProps;
  activityIndicator?: ActivityIndicatorProps;
};

export const ScreenActivityIndicator: React.FC<ScreenActivityIndicatorProps> = ({view, activityIndicator}) => {
  const theme = useTheme();
  return (
    <View {...view} style={[{padding: 16, backgroundColor: theme.colors.background, flex: 1}, view?.style]}>
      <ActivityIndicator {...activityIndicator} />
    </View>
  );
};
