import React from 'react';
import analytics from '@react-native-firebase/analytics';
import {Button, Card, Divider, Text, TextInput, useTheme} from 'react-native-paper';
import ScreenWrapper from '../ScreenWrapper';
import {ScreenDetails} from '../types/ScreenDetails.type';
import {useSnackbarContext} from '../context/Snackbar.context';
import {useStoreContext} from '../context/Store.context';
import {LabelValue} from '../components/LabelValue';
import {Panthor} from '../constants/panthor.constant';
import {displayName as appDisplayName, version as appVersion} from '../../app.json';
import {ApiKeyService} from '../services/ApiKey.service';
import {useTranslation} from 'react-i18next';
import {SwitchLabel} from '../components/SwitchLabel';
import {PreferenceService, type Preferences} from '../services';

// export type SettingsScreenProps = WithTranslation & {};
export type SettingsScreenProps = {};

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {showSnackbar} = useSnackbarContext();
  const {apiKey, setApiKey} = useStoreContext();
  const [newApiKey, setNewApiKey] = React.useState(apiKey);
  const [preferences, setPreferences] = React.useState<Preferences | null>(null);

  const handler = {
    onApiKeyInputChange(value: string) {
      setNewApiKey(value);
    },
    async deleteApiKey() {
      try {
        await ApiKeyService.save(null);
        setApiKey(null);
        setNewApiKey(null);
        showSnackbar({message: t('settings.api_key.delete_alert')});
      } catch (error) {
        console.error(error);
        showSnackbar({
          message: t('settings.api_key.delete_failed_alert'),
          action: {label: t('settings.api_key.delete_retry_text'), onPress: handler.deleteApiKey},
        });
      }
    },
    async saveNewApiKey() {
      try {
        if (!newApiKey || newApiKey === apiKey) return;
        if (newApiKey.length === 0) {
          return showSnackbar({message: t('settings.api_key.save_invalid_value_text')});
        }
        const valid = await ApiKeyService.validate(newApiKey);
        if (!valid) return showSnackbar({message: t('settings.api_key.save_invalid_key_text')});
        await ApiKeyService.save(newApiKey);
        setApiKey(newApiKey);
        showSnackbar({message: t('settings.api_key.save_key_saved_text')});
      } catch (error) {
        console.error(error);
        showSnackbar({
          message: t('settings.api_key.save_key_failed_text'),
          action: {label: t('settings.api_key.save_retry_text'), onPress: handler.saveNewApiKey},
        });
      }
    },
    onToggleAnalytics() {
      PreferenceService.save(
        {
          enablePushNotification: preferences?.enablePushNotification || false,
          enableAnalytics: !preferences?.enableAnalytics || false,
        },
        prefs => setPreferences(prefs),
      );
    },
    onToggleNotifications() {
      PreferenceService.save(
        {
          enablePushNotification: !preferences?.enablePushNotification || false,
          enableAnalytics: preferences?.enableAnalytics || false,
        },
        prefs => setPreferences(prefs),
      );
    },
  };

  React.useEffect(() => {
    PreferenceService.restore(pref => setPreferences(pref));
  }, []);

  React.useEffect(() => {
    analytics().setAnalyticsCollectionEnabled(preferences ? preferences.enableAnalytics : false);
  }, [preferences]);

  return (
    <ScreenWrapper contentContainerStyle={{padding: 16}}>
      <Card style={{marginBottom: 16}}>
        <Card.Title title={t('settings.screen.title')} titleStyle={{fontWeight: 'bold'}} />
        <Card.Content>
          <Text variant="bodyMedium">{t('settings.api_key.card_text')}</Text>

          <TextInput
            mode="outlined"
            label={t('settings.api_key.input_label')}
            value={newApiKey ?? ''}
            onChangeText={handler.onApiKeyInputChange}
            style={{
              marginTop: 8,
              backgroundColor: theme.colors.elevation.level1,
            }}
          />
        </Card.Content>
        <Card.Actions>
          <Button mode="text" onPress={handler.deleteApiKey}>
            {t('settings.api_key.delete_btn')}
          </Button>
          <Button mode="contained" onPress={handler.saveNewApiKey}>
            {t('settings.api_key.save_btn')}
          </Button>
        </Card.Actions>

        <Card.Content>
          <Divider style={{marginVertical: 16}} />

          <SwitchLabel
            label={t('settings.enable_analytics')}
            value={preferences ? preferences.enableAnalytics : false}
            onChange={handler.onToggleAnalytics}
          />

          {/* <SwitchLabel
            label={t('settings.enable_notifications')}
            value={preferences ? preferences.enablePushNotification : false}
            onChange={handler.onToggleNotifications}
          /> */}
        </Card.Content>
      </Card>

      <Card>
        <Card.Cover source={{uri: Panthor.modPreview}} />
        <Card.Content>
          <LabelValue label={t('settings.info_box.name_label')} value={appDisplayName} />
          <LabelValue label={t('settings.info_box.version_label')} value={appVersion} />
        </Card.Content>
      </Card>
    </ScreenWrapper>
  );
};

export const SettingsScreenDetails: ScreenDetails<SettingsScreenProps> = {
  name: 'Settings',
  label: 'Einstellungen',
  label_key: 'settings.screen.title',
  icon: 'cog',
  component: SettingsScreen,
};
