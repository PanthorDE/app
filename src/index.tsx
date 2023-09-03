import React from 'react';
import {Platform, useColorScheme, StatusBar} from 'react-native';
import {getHeaderTitle} from '@react-navigation/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerNavigationProp, createDrawerNavigator} from '@react-navigation/drawer';
import {
  InitialState,
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {Theme} from './theme/theme';
import {Provider as PaperProvider, MD3DarkTheme, MD3LightTheme, adaptNavigationTheme, Appbar} from 'react-native-paper';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {Screens} from './screens';
import DrawerItems from './DrawerItems';
import {StoreProvider} from './context/Store.context';
import {SnackbarProvider} from './context/Snackbar.context';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';
const PREFERENCE_KEY = 'APP_PREFERENCES';

const Drawer = createDrawerNavigator();

export function PanthorApp() {
  const colorScheme = useColorScheme();
  const isDarkMode = React.useMemo(() => colorScheme === 'dark', [colorScheme]);
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState<InitialState | undefined>();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = JSON.parse(savedStateString || '');

        // console.log(state);

        setInitialState(state);
      } catch (e) {
        // ignore error
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  React.useEffect(() => {
    const restorePrefs = async () => {
      try {
        const prefString = await AsyncStorage.getItem(PREFERENCE_KEY);
        const preferences = JSON.parse(prefString || '');

        if (preferences) {
          // TODO: Load pres
        }
      } catch (e) {
        // ignore error
      }
    };

    restorePrefs();
  }, []);

  if (!isReady) {
    return null;
  }

  const cardStyleInterpolator =
    Platform.OS === 'android'
      ? CardStyleInterpolators.forFadeFromBottomAndroid
      : CardStyleInterpolators.forHorizontalIOS;

  const {LightTheme, DarkTheme} = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
    },
  };

  const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...DarkTheme.colors,
    },
  };

  const combinedTheme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider theme={Theme}>
      <StoreProvider>
        <SnackbarProvider>
          <NavigationContainer
            theme={combinedTheme}
            initialState={initialState}
            onStateChange={state => AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <SafeAreaInsetsContext.Consumer>
              {() => {
                return (
                  <Drawer.Navigator
                    initialRouteName={Screens[0].name}
                    drawerContent={props => <DrawerItems {...props} />}
                    screenOptions={({navigation}) => ({
                      drawerStyle: {width: '75%'},
                      detachPreviousScreen: !navigation.isFocused(),
                      cardStyleInterpolator,
                      header: ({navigation, route, options}) => {
                        const title = getHeaderTitle(options, route.name);
                        return (
                          <Appbar.Header elevated>
                            {(navigation as any).openDrawer ? (
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
                    })}>
                    {Screens.map(screen => (
                      <Drawer.Screen
                        key={screen.name}
                        name={screen.name}
                        component={screen.component}
                        options={{title: screen.label}}
                      />
                    ))}
                  </Drawer.Navigator>
                );
              }}
            </SafeAreaInsetsContext.Consumer>
          </NavigationContainer>
        </SnackbarProvider>
      </StoreProvider>
    </PaperProvider>
  );
}
