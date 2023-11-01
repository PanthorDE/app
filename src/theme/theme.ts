import {MD3DarkTheme} from 'react-native-paper';
import {type ThemeProp} from 'react-native-paper/lib/typescript/src/types';

export const Theme: ThemeProp = {
  ...MD3DarkTheme,
  dark: true,
  roundness: 4,
  colors: {
    ...MD3DarkTheme.colors,
    // primary: '#e52222',
    // onPrimary: '#000000',
    // primaryContainer: '#b91d1d',
    // onPrimaryContainer: '#fff',
    // secondary: '#e52222',
    // onSecondary: '#000000',
    // secondaryContainer: '#b91d1d',
    // onSecondaryContainer: '#fff',
    // // secondary: '#f2a104', // Sekundärfarbe als Komplementärfarbe zur Primärfarbe
    // // onSecondary: '#000000',
    // // secondaryContainer: '#b57c04', // Dunklere Schattierung der Sekundärfarbe
    // // onSecondaryContainer: '#fff',
    // tertiary: '#f2e104', // Tertiärfarbe als weitere Komplementärfarbe
    // onTertiary: '#000000',
    // tertiaryContainer: '#b5a904', // Dunklere Schattierung der Tertiärfarbe
    // onTertiaryContainer: '#fff',
    // error: '#ff0000', // Fehlerfarbe als hellerer Rotton
    // onError: '#000000',
    // errorContainer: '#b50000', // Dunklere Schattierung der Fehlerfarbe
    // onErrorContainer: '#fff',
    // background: '#262729', // Dunkler Grauton für den Hintergrund
    // onBackground: '#fff', // Primärfarbe auf dem Hintergrund
    // surface: '#262729', // Gleiche Farbe wie der Hintergrund für die Oberfläche
    // onSurface: '#fff', // Primärfarbe auf der Oberfläche
    // surfaceVariant: '#1a1b1c', // Dunklere Schattierung des Hintergrunds für die Oberflächenvariante
    // onSurfaceVariant: '#fff', // Primärfarbe auf der Oberflächenvariante
    // outline: '#e52222', // Primärfarbe für die Umrisse
    // outlineVariant: '##fff', // Dunklere Schattierung der Primärfarbe für die Umrissvariante
    // shadow: 'rgb(0, 0, 0)',
    // scrim: 'rgb(0, 0, 0)',
    // inverseSurface: 'rgb(227, 226, 230)',
    // inverseOnSurface: 'rgb(47, 48, 51)',
    // inversePrimary: '#1addf2', // Inverse Primärfarbe als Komplementärfarbe zur Primärfarbe
    // elevation: {
    //   level0: 'transparent',
    //   level1: 'rgb(33, 36, 41)',
    //   level2: 'rgb(38, 41, 48)',
    //   level3: 'rgb(42, 46, 55)',
    //   level4: 'rgb(43, 48, 57)',
    //   level5: 'rgb(46, 51, 62)',
    // },
    // surfaceDisabled: 'rgba(227, 226, 230, 0.12)',
    // onSurfaceDisabled: 'rgba(227, 226, 230, 0.38)',
    // backdrop: 'rgba(45, 48, 56, 0.4)',
  },
};
