import ExpoMaterial3ThemeModule from '@pchmn/expo-material3-theme/build/ExpoMaterial3ThemeModule';
import { isDynamicThemeSupported } from '@pchmn/expo-material3-theme';
import { Platform } from 'react-native';

export function test() {
  return {
    module: ExpoMaterial3ThemeModule || 'no-module',
    module_bool: Boolean(ExpoMaterial3ThemeModule),
    os: Platform.OS,
    version: Platform.Version,
  };
}

// export const deviceColorsSupported =
//   Boolean(ExpoMaterial3ThemeModule) &&
//   JSON.stringify(ExpoMaterial3ThemeModule) != JSON.stringify({}) &&
//   Platform.OS === 'android' &&
//   Platform.Version >= 31;
