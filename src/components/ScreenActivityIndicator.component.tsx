import React from 'react';
import {type ViewProps, View} from 'react-native';
import {type ActivityIndicatorProps, ActivityIndicator} from 'react-native-paper';

export type ScreenActivityIndicatorProps = {
  view?: ViewProps;
  activityIndicator?: ActivityIndicatorProps;
};

export const ScreenActivityIndicator: React.FC<ScreenActivityIndicatorProps> = ({view, activityIndicator}) => {
  return (
    <View {...view} style={[{padding: 16}, view?.style]}>
      <ActivityIndicator {...activityIndicator} />
    </View>
  );
};
