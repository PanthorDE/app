import React from 'react';
import {Easing, StyleSheet, View} from 'react-native';
import {type StackNavigationProp} from '@react-navigation/stack';
import {BottomNavigation} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {type ScreenDetails} from '../types/ScreenDetails.type';
import CompanyScreen, {CompanyScreenDetails} from './Company.screen';
import {CompanyShopScreenDetails, CompanyShopsScreen} from './CompanyShops.screen';
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

export type CompanyNavigationProps = {
  navigation: StackNavigationProp<{}>;
};

export const CompanyNavigationScreen: React.FC<CompanyNavigationProps> = ({navigation}) => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState<RoutesState>([
    {
      key: CompanyScreenDetails.name,
      title: t('company.list.title'),
      unfocusedIcon: CompanyScreenDetails.icon,
      focusedIcon: CompanyScreenDetails.icon,
    },
    {
      key: CompanyShopScreenDetails.name,
      title: t('company.shops.title'),
      unfocusedIcon: CompanyShopScreenDetails.icon,
      focusedIcon: CompanyShopScreenDetails.icon,
    },
  ]);
  const components = {
    [CompanyScreenDetails.name]: CompanyScreen,
    [CompanyShopScreenDetails.name]: CompanyShopsScreen,
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

export const CompanyNavigationDetails: ScreenDetails<CompanyNavigationProps> = {
  name: 'CompanyNavigation',
  label: 'Firmen',
  label_key: 'company.navigation_screen.title',
  icon: 'domain',
  component: CompanyNavigationScreen,
};

export default CompanyNavigationScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
