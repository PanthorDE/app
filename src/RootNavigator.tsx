import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { getHeaderTitle } from '@react-navigation/elements';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Screens } from './screens';

const Stack = createStackNavigator();

export default function Root() {
  const cardStyleInterpolator =
    Platform.OS === 'android'
      ? CardStyleInterpolators.forFadeFromBottomAndroid
      : CardStyleInterpolators.forHorizontalIOS;
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => {
        return {
          detachPreviousScreen: !navigation.isFocused(),
          cardStyleInterpolator,
          header: ({ navigation, route, options, back }) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <Appbar.Header elevated>
                {back ? (
                  <Appbar.BackAction onPress={() => navigation.goBack()} />
                ) : (navigation as any).openDrawer ? (
                  <Appbar.Action
                    icon="menu"
                    isLeading
                    onPress={() => (navigation as any as DrawerNavigationProp<{}>).openDrawer()}
                  />
                ) : null}
                <Appbar.Content title={title} />
              </Appbar.Header>
            );
          },
        };
      }}
    >
      {Screens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{ title: screen.label }}
        />
      ))}
    </Stack.Navigator>
  );
}
