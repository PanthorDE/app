import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, CardProps, Text} from 'react-native-paper';
import {RpgServer, Server as ServerModel} from '../../models';

export type ServerProps = {
  cardStyle?: CardProps['style'];
  server: RpgServer | ServerModel;
  onPress?: (server: ServerProps['server']) => void;
};

export const Server: React.FC<ServerProps> = ({server, onPress, cardStyle}) => {
  return (
    <Card style={cardStyle} onPress={onPress ? () => onPress(server) : undefined}>
      <Card.Title
        title={server.servername}
        titleStyle={{fontWeight: 'bold'}}
        subtitle={`Online: ${server.players.length}/${server.slots}`}
      />
      <Card.Content style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {server instanceof RpgServer ? (
          <React.Fragment>
            <View style={styles.column}>
              <Text>Zivilisten: {server.civilians}</Text>
            </View>
            <View style={styles.column}>
              <Text>Abramier: {server.medics}</Text>
            </View>
            <View style={styles.column}>
              <Text>RAC'ler: {server.rac}</Text>
            </View>
            <View style={styles.column}>
              <Text>Polizisten: {server.cops}</Text>
            </View>
            <View style={styles.column}>
              <Text>Justiz'ler: {server.justice}</Text>
            </View>
          </React.Fragment>
        ) : (
          <View>
            <Text>Spieler: {server.players.length}</Text>
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
