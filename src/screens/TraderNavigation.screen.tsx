import React from 'react';
import {Easing, StyleSheet, View} from 'react-native';
import {type StackNavigationProp} from '@react-navigation/stack';
import {BottomNavigation} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {type ScreenDetails} from '../types/ScreenDetails.type';
import ItemTraderScreen, {ItemTraderScreenDetails} from './ItemTrader.screen';
import VehicleTraderScreen, {VehicleTraderScreenDetails} from './VehicleTrader.screen';

type RoutesState = {
  key: string;
  title: string;
  focusedIcon: string;
  unfocusedIcon?: string;
  color?: string;
  badge?: boolean;
  getAccessibilityLabel?: string;
  getTestID?: string;
}[];

export type TraderNavigationProps = {
  navigation: StackNavigationProp<{}>;
};

export const TraderNavigationScreen: React.FC<TraderNavigationProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState<RoutesState>([
    {
      key: ItemTraderScreenDetails.name,
      title: ItemTraderScreenDetails.label,
      unfocusedIcon: ItemTraderScreenDetails.icon,
      focusedIcon: ItemTraderScreenDetails.icon,
    },
    {
      key: VehicleTraderScreenDetails.name,
      title: VehicleTraderScreenDetails.label,
      unfocusedIcon: VehicleTraderScreenDetails.icon,
      focusedIcon: VehicleTraderScreenDetails.icon,
    },
  ]);
  const components = {
    [ItemTraderScreenDetails.name]: ItemTraderScreen,
    [VehicleTraderScreenDetails.name]: VehicleTraderScreen,
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({headerShown: true});
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <BottomNavigation
        safeAreaInsets={{bottom: insets.bottom}}
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        labelMaxFontSizeMultiplier={2}
        renderScene={BottomNavigation.SceneMap(components)}
        sceneAnimationType="shifting"
        sceneAnimationEnabled
        sceneAnimationEasing={Easing.ease}
        getLazy={({route}) => route.key !== 'album'}
      />
    </View>
  );
};

export const TraderNavigationDetails: ScreenDetails<TraderNavigationProps> = {
  name: 'TraderNavigation',
  label: 'Händler',
  icon: 'store',
  component: TraderNavigationScreen,
};

export default TraderNavigationScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
