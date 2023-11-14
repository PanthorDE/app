import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConfig from '../App.config';

export type Preferences = {
  enablePushNotification: boolean;
  enableAnalytics: boolean;
};

export class PreferenceService {
  private static PREFERENCE_KEY = AppConfig.storage.PREFERENCE_KEY;

  static async restore(cb?: (preferences: Preferences | null) => void): Promise<Preferences | undefined> {
    try {
      const prefString = await AsyncStorage.getItem(this.PREFERENCE_KEY);
      const preferences: Preferences = prefString ? JSON.parse(prefString) : this.getFallbackPreferences();
      if (cb) cb(preferences);
      return preferences;
    } catch (e) {
      console.error(e);
    }
  }

  static async save(preferences: Preferences | null, cb?: (preferences: Preferences | null) => void): Promise<void> {
    try {
      const prefs: Preferences = preferences ?? this.getFallbackPreferences();
      await AsyncStorage.setItem(this.PREFERENCE_KEY, JSON.stringify(prefs));
      if (cb) cb(prefs);
    } catch (e) {
      console.error(e);
    }
  }

  static getFallbackPreferences(): Preferences {
    return {
      enableAnalytics: false,
      enablePushNotification: false,
    };
  }
}
