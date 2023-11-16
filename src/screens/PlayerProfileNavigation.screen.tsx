import React from 'react';
import {Easing, StyleSheet, View} from 'react-native';
import {type StackNavigationProp} from '@react-navigation/stack';
import {BottomNavigation} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {type ScreenDetails} from '../types/ScreenDetails.type';
import PlayerProfileScreen, {PlayerProfileScreenDetails} from './PlayerProfile.screen';
import GarageScreen, {GarageScreenDetails} from './Garage.screen';
import PhonebooksScreen, {PhonebookScreenDetails} from './Phonebooks.screen';
import PlayerHousesScreen, {PlayerHousesScreenDetails} from './PlayerHouses.screen';
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

export type PlayerProfileNavigationProps = {
  navigation: StackNavigationProp<{}>;
};

export const PlayerProfileNavigationScreen: React.FC<PlayerProfileNavigationProps> = ({navigation}) => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const [index, setIndex] = React.useState(0);
  const getScreenTitle = ({label, label_key}: ScreenDetails<any>): string => {
    return label_key ? t(label_key) : label;
  };
  const [routes] = React.useState<RoutesState>([
    {
      key: PlayerProfileScreenDetails.name,
      title: getScreenTitle(PlayerProfileNavigationDetails),
      unfocusedIcon: PlayerProfileScreenDetails.icon,
      focusedIcon: PlayerProfileScreenDetails.icon,
    },
    {
      key: GarageScreenDetails.name,
      title: getScreenTitle(GarageScreenDetails),
      unfocusedIcon: GarageScreenDetails.icon,
      focusedIcon: GarageScreenDetails.icon,
    },
    {
      key: PlayerHousesScreenDetails.name,
      title: getScreenTitle(PlayerHousesScreenDetails),
      unfocusedIcon: PlayerHousesScreenDetails.icon,
      focusedIcon: PlayerHousesScreenDetails.icon,
    },
    {
      key: PhonebookScreenDetails.name,
      title: getScreenTitle(PhonebookScreenDetails),
      unfocusedIcon: PhonebookScreenDetails.icon,
      focusedIcon: PhonebookScreenDetails.icon,
    },
  ]);
  const components = {
    [PlayerProfileScreenDetails.name]: PlayerProfileScreen,
    [GarageScreenDetails.name]: GarageScreen,
    [PlayerHousesScreenDetails.name]: PlayerHousesScreen,
    [PhonebookScreenDetails.name]: PhonebooksScreen,
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

export const PlayerProfileNavigationDetails: ScreenDetails<PlayerProfileNavigationProps> = {
  name: 'PlayerProfileNavigation',
  label: 'Profil',
  label_key: 'profile.navigation_screen.title',
  icon: 'account-circle',
  component: PlayerProfileNavigationScreen,
};

export default PlayerProfileNavigationScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
