import type {DrawerNavigationProp} from '@react-navigation/drawer';
import {getHeaderTitle} from '@react-navigation/elements';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Platform} from 'react-native';
import {Appbar} from 'react-native-paper';
import {Screens} from './screens';
import {useTranslation} from 'react-i18next';

const Stack = createStackNavigator();

export default function Root() {
  const {t} = useTranslation();
  const cardStyleInterpolator =
    Platform.OS === 'android'
      ? CardStyleInterpolators.forFadeFromBottomAndroid
      : CardStyleInterpolators.forHorizontalIOS;
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => {
        return {
          detachPreviousScreen: !navigation.isFocused(),
          cardStyleInterpolator,
          header: ({navigation, route, options, back}) => {
            // FIXME: Isn't used anywhere. In order to change its value go to the index.tsx
            const title = getHeaderTitle(options, route.name);
            return (
              <Appbar.Header elevated>
                {back ? (
                  <Appbar.BackAction onPress={() => navigation.goBack()} />
                ) : (
                  (navigation as any).openDrawer && (
                    <Appbar.Action
                      icon="menu"
                      isLeading
                      onPress={() => (navigation as any as DrawerNavigationProp<{}>).openDrawer()}
                    />
                  )
                )}
                <Appbar.Content title={'test' + title} />
              </Appbar.Header>
            );
          },
        };
      }}>
      {Screens.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          // FIXME: Isn't used anywhere either. In order to change its value go to the index.tsx
          options={{title: screen.label_key ? t(screen.label_key) : screen.label}}
        />
      ))}
    </Stack.Navigator>
  );
}
