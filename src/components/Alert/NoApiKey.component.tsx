import React from 'react';
import {Button, Card, Text} from 'react-native-paper';
import {Icon} from '../Icon';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SettingsScreenDetails} from '../../screens/Settings.screen';
import {useTranslation} from 'react-i18next';

export type NoApiKeyProps = {};

export const NoApiKey: React.FC<NoApiKeyProps> = props => {
  const navigate = useNavigation();
  const {t} = useTranslation();
  return (
    <Card style={[{margin: 18, padding: 16}]}>
      <Card.Content>
        <View style={{display: 'flex', alignItems: 'center'}}>
          <Icon icon="key-alert" />
        </View>
        <Text variant="titleMedium" style={[style.textCenter, {marginTop: 8}]}>
          {t('no_api_key_dialog.title')}
        </Text>
        <Text style={[style.textCenter, {marginTop: 4}]}>{t('no_api_key_dialog.text')}</Text>
      </Card.Content>

      <Card.Actions style={{display: 'flex'}}>
        <Button
          mode="text"
          icon={SettingsScreenDetails.icon}
          style={{marginRight: 'auto', marginLeft: 'auto'}}
          //   @ts-ignore // FIXME: Dont suppress with @ts-ignore
          onPress={() => navigate.navigate(SettingsScreenDetails.name)}>
          {t('no_api_key_dialog.button')}
        </Button>
      </Card.Actions>
    </Card>
  );
};

const style = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },
});
