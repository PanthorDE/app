import { type DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Drawer, Text, useTheme } from 'react-native-paper';
import { Screens } from './screens';

export default function DrawerItems(props: DrawerContentComponentProps) {
  const { colors } = useTheme();
  const [drawerItemIndex, setDrawerItemIndex] = React.useState<number>(0);

  return (
    <DrawerContentScrollView
      {...props}
      alwaysBounceVertical={false}
      style={[
        styles.drawerContent,
        {
          backgroundColor: colors.surface,
        },
      ]}
    >
      <React.Fragment>
        {Screens.map((screen, idx) => (
          <Drawer.Item
            {...screen.drawerItemProps}
            key={screen.name}
            active={drawerItemIndex === idx}
            label={screen.label}
            icon={screen.icon}
            onPress={() => {
              setDrawerItemIndex(idx);
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
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  v3Preference: {
    height: 56,
    paddingHorizontal: 28,
  },
  badge: {
    alignSelf: 'center',
  },
  collapsedSection: {
    marginTop: 16,
  },
  annotation: {
    marginHorizontal: 24,
    marginVertical: 6,
  },
});
