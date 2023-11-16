import React from 'react';
import {Easing, StyleSheet, View} from 'react-native';
import {type StackNavigationProp} from '@react-navigation/stack';
import {BottomNavigation} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {type ScreenDetails} from '../types/ScreenDetails.type';
import ItemTraderScreen, {ItemTraderScreenDetails} from './ItemTrader.screen';
import VehicleTraderScreen, {VehicleTraderScreenDetails} from './VehicleTrader.screen';
import {useTranslation} from 'react-i18next';

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
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const [index, setIndex] = React.useState(0);
  const getScreenTitle = ({label, label_key}: ScreenDetails<any>): string => {
    return label_key ? t(label_key) : label;
  };
  const [routes] = React.useState<RoutesState>([
    {
      key: ItemTraderScreenDetails.name,
      title: getScreenTitle(ItemTraderScreenDetails),
      unfocusedIcon: ItemTraderScreenDetails.icon,
      focusedIcon: ItemTraderScreenDetails.icon,
    },
    {
      key: VehicleTraderScreenDetails.name,
      title: getScreenTitle(VehicleTraderScreenDetails),
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
  label_key: 'trader.navigation_screen.title',
  icon: 'store',
  component: TraderNavigationScreen,
};

export default TraderNavigationScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
