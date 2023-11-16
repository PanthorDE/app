import {DrawerItemProps} from 'react-native-paper';

export type ScreenDetails<T> = {
  name: string;
  /**
   * @deprecated
   * Provide an label_key instead which will be localized
   */
  label: string;
  label_key?: string;
  icon: string;
  component: React.FC<T>;
  drawerItemProps?: DrawerItemProps;
};
