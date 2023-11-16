import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import de from './de.json';
import {NativeModules} from 'react-native';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    resources: {
      de: {translation: de},
      en: {translation: en},
    },
    // FIXME: Get locale based on phone preference
    lng: getDeviceLocale(),
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

export function getDeviceLocale(): string {
  let locale: string = '';

  if (
    NativeModules.SettingsManager &&
    NativeModules.SettingsManager.settings &&
    NativeModules.SettingsManager.settings.AppleLanguages
  ) {
    locale = NativeModules.SettingsManager.settings.AppleLanguages[0];
    // Android
  } else if (NativeModules.I18nManager) {
    locale = NativeModules.I18nManager.localeIdentifier;
  }

  if (locale == 'de_DE') return 'de';
  return 'en';
}
