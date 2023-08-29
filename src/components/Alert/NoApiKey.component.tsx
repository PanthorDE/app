import React from 'react';
import {Button, Card, Text} from 'react-native-paper';
import {Icon} from '../Icon';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SettingsScreenDetails} from '../../screens/Settings.screen';

export type NoApiKeyProps = {};

export const NoApiKey: React.FC<NoApiKeyProps> = props => {
  const navigate = useNavigation();
  return (
    <Card style={[{margin: 18, padding: 16}]}>
      <Card.Content>
        <View style={{display: 'flex', alignItems: 'center'}}>
          <Icon icon="key-alert" />
        </View>
        <Text variant="titleMedium" style={[style.textCenter, {marginTop: 8}]}>
          Es wurde kein API-Key gefunden.
        </Text>
        <Text style={[style.textCenter, {marginTop: 4}]}>
          Dieser wir benötigt um Spielerspezifische Informationen abzurufen.
        </Text>
      </Card.Content>

      <Card.Actions style={{display: 'flex'}}>
        <Button
          mode="text"
          icon={SettingsScreenDetails.icon}
          style={{marginRight: 'auto', marginLeft: 'auto'}}
          //   @ts-ignore // FIXME: Dont suppress with @ts-ignore
          onPress={() => navigate.navigate(SettingsScreenDetails.name)}>
          {SettingsScreenDetails.label}
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
