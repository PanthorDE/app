import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, CardProps, Text} from 'react-native-paper';
import {RpgServer, Server as ServerModel} from '../../models';
import {useTranslation} from 'react-i18next';

export type ServerProps = {
  cardStyle?: CardProps['style'];
  server: RpgServer | ServerModel;
  onPress?: (server: ServerProps['server']) => void;
};

export const Server: React.FC<ServerProps> = ({server, onPress, cardStyle}) => {
  const {t} = useTranslation();
  return (
    <Card style={cardStyle} onPress={onPress ? () => onPress(server) : undefined}>
      <Card.Title
        title={server.servername}
        titleStyle={{fontWeight: 'bold'}}
        subtitle={t('server.server.currently_online', {curr: server.players.length, max: server.slots})}
      />
      <Card.Content style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {server instanceof RpgServer ? (
          <React.Fragment>
            <View style={styles.column}>
              <Text>
                {t('sides.civilians')}: {server.civilians}
              </Text>
            </View>
            <View style={styles.column}>
              <Text>
                {t('sides.medics')}: {server.medics}
              </Text>
            </View>
            <View style={styles.column}>
              <Text>
                {t('sides.rac')}: {server.rac}
              </Text>
            </View>
            <View style={styles.column}>
              <Text>
                {t('sides.cops')}: {server.cops}
              </Text>
            </View>
            <View style={styles.column}>
              <Text>
                {t('sides.attorneys')}: {server.justice}
              </Text>
            </View>
          </React.Fragment>
        ) : (
          <View>
            <Text>
              {t('sides.players')}: {server.players.length}
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  column: {
    width: '50%',
  },
});
