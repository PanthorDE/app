import * as React from 'react';
import { Avatar, Button, Card, Text, TextInput, useTheme } from 'react-native-paper';
import ScreenWrapper from '../ScreenWrapper';
import { ScreenDetails } from '../types/ScreenDetails.type';
import { SnackbarContext } from '../context/Snackbar.context';
import { StoreContext } from '../context/Store.context';
import { LabelValue } from '../components/LabelValue';
import { Panthor } from '../constants/panthor.constant';
import { expo } from '../../app.json';
import { ApiKeyService } from '../services/ApiKey.service';

export type SettingsScreenProps = {};

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const theme = useTheme();
  const { showSnackbar } = React.useContext(SnackbarContext);
  const { apiKey, setApiKey } = React.useContext(StoreContext);
  const [newApiKey, setNewApiKey] = React.useState(apiKey);

  const handler = {
    onApiKeyInputChange: function (value: string) {
      setNewApiKey(value);
    },
    deleteApiKey: async function () {
      try {
        await ApiKeyService.save(null);
        setApiKey(null);
        showSnackbar({ message: 'API-Key gelöscht' });
      } catch (error) {
        console.error(error);
        showSnackbar({ message: 'Löschen fehlgeschlagen', action: { label: 'Erneut', onPress: handler.deleteApiKey } });
      }
    },
    saveNewApiKey: async function () {
      try {
        if (newApiKey === apiKey) return;
        if (newApiKey.length === 0) return showSnackbar({ message: 'Ungülter Wert vorhanden' });
        const valid = await ApiKeyService.validate(newApiKey);
        if (!valid) return showSnackbar({ message: 'Ungültiger API-Key' });
        await ApiKeyService.save(newApiKey);
        setApiKey(newApiKey);
        showSnackbar({ message: 'API-Key gespeichert' });
      } catch (error) {
        console.error(error);
        showSnackbar({
          message: 'Speichern fehlgeschlagen',
          action: { label: 'Erneut', onPress: handler.saveNewApiKey },
        });
      }
    },
  };

  return (
    <ScreenWrapper contentContainerStyle={{ padding: 16 }}>
      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="Einstellungen" />
        <Card.Content>
          <Text variant="bodyMedium">
            Um die App im vollem Umfang nutzen zu können, wird empfohlen dein Panthor API-Key anzugeben.
          </Text>

          <TextInput
            mode="outlined"
            label="API-Key"
            value={newApiKey}
            onChangeText={handler.onApiKeyInputChange}
            style={{ marginTop: 8, backgroundColor: theme.colors.elevation.level1 }}
          />
        </Card.Content>
        <Card.Actions>
          <Button mode="text" onPress={handler.deleteApiKey}>
            Löschen
          </Button>
          <Button mode="contained" onPress={handler.saveNewApiKey}>
            Speichern
          </Button>
        </Card.Actions>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Card.Cover
          source={{
            uri: 'https://opengraph.githubassets.com/27243bf731ee5a6df2277b9717adfb57fe3e680d279a028ff9e6455f47a8516d/tklein1801/A3PLI',
          }}
        />
        <Card.Content>
          <LabelValue label="Name" value={expo.name} />
          <LabelValue label="Version" value={expo.version} />
        </Card.Content>
      </Card>

      <Card>
        <Card.Cover source={{ uri: Panthor.modPreview }} />
        <Card.Content>
          <Text style={{ textAlign: 'center', marginTop: 16 }}>
            Es handelt sich um keine offizielle App von Panthor.de
          </Text>
        </Card.Content>
      </Card>
    </ScreenWrapper>
  );
};

export const SettingsScreenDetails: ScreenDetails<SettingsScreenProps> = {
  name: 'Settings',
  label: 'Einstellungen',
  icon: 'cog',
  component: SettingsScreen,
};
