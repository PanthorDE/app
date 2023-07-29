import { DrawerItemProps } from 'react-native-paper';

export type ScreenDetails<T> = {
  name: string;
  label: string;
  icon: string;
  component: React.FC<T>;
  drawerItemProps?: DrawerItemProps;
};
