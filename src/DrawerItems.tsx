import {type DrawerContentComponentProps, DrawerContentScrollView} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Drawer, Text, useTheme} from 'react-native-paper';
import {Screens} from './screens';
import {useStoreContext} from './context/Store.context';
import {rgbStringToHex, rgbToHex} from './theme/rgbToHex';

export default function DrawerItems(props: DrawerContentComponentProps) {
  const theme = useTheme();
  const {profile} = useStoreContext();

  const isActive = React.useCallback(
    (screenName: string) => {
      try {
        return props.state.routeNames[props.state.index] === screenName;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [props.state],
  );

  return (
    <DrawerContentScrollView
      {...props}
      alwaysBounceVertical={false}
      style={[
        styles.drawerContent,
        {
          backgroundColor: theme.colors.surface,
        },
      ]}>
      {profile != null && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: 8,
            marginBottom: 18,
            paddingVertical: 8 * 2,
            paddingHorizontal: 16,
            backgroundColor: '#3d4659',
            borderRadius: theme.roundness * 2,
          }}>
          <Image
            source={{uri: profile.avatar_full}}
            style={{
              width: 56,
              height: 56,
              marginRight: 8,
              borderRadius: theme.roundness,
            }}
          />
          <View>
            <Text variant="titleMedium">{profile.name}</Text>
            <Text>{profile.pid}</Text>
          </View>
        </View>
      )}
      <React.Fragment>
        {Screens.map((screen, idx) => (
          <Drawer.Item
            {...screen.drawerItemProps}
            key={screen.name}
            active={isActive(screen.name)}
            label={screen.label}
            icon={screen.icon}
            onPress={() => {
              if (props.navigation) props.navigation.navigate(screen.name);
            }}
          />
        ))}
      </React.Fragment>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
});
