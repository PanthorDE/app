import {MD3DarkTheme} from 'react-native-paper';
import {type ThemeProp} from 'react-native-paper/lib/typescript/src/types';

export const Theme: ThemeProp = {
  ...MD3DarkTheme,
  dark: true,
  roundness: 4,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#ffb4ab',
    onPrimary: '#690005',
    primaryContainer: '#93000a',
    onPrimaryContainer: '#ffb4ab',
    secondary: '#ffb4ab',
    onSecondary: '#690005',
    secondaryContainer: '#93000a',
    onSecondaryContainer: '#ffb4ab',
    tertiary: '#dcbce0',
    onTertiary: '#3f2844',
    tertiaryContainer: '#573e5c',
    onTertiaryContainer: '#fad8fd',
    error: '#ffb4ab',
    onError: '#690005',
    errorContainer: '#93000a',
    onErrorContainer: '#ffb4ab',
    background: '#111518', // 111518
    onBackground: '#e3e2e6',
    surface: '#111518', // 111518
    onSurface: '#e3e2e6',
    surfaceVariant: '#44474e',
    onSurfaceVariant: '#c4c6d0',
    outline: '#8e9099',
    outlineVariant: '#44474e',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#e3e2e6',
    inverseOnSurface: '#2f3033',
    inversePrimary: '#0c5db6',
    elevation: {
      level0: 'transparent',
      // TODO: Increase color opacity for each level
      level1: '#181A1C',
      level2: '#181A1C',
      level3: '#181A1C',
      level4: '#181A1C',
      level5: '#181A1C',
    },
    surfaceDisabled: 'rgba(227, 226, 230, 0.12)',
    onSurfaceDisabled: 'rgba(227, 226, 230, 0.38)',
    backdrop: 'rgba(45, 48, 56, 0.4)',
  },
};
