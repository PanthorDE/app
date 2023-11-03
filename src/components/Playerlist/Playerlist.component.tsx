import React from 'react';
import {Card, Chip, Text} from 'react-native-paper';
import {Server} from '../../models';
import {useTranslation} from 'react-i18next';

export const Playerlist: React.FC<{players: Server['players']}> = ({players}) => {
  const {t} = useTranslation();
  const id = React.useId();

  return (
    <Card>
      <Card.Title title={t('server.player_list.title')} titleStyle={{fontWeight: 'bold'}} />
      <Card.Content
        style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: players.length <= 0 ? 'center' : 'flex-start'}}>
        {players.length > 0 ? (
          players.map((player, index) => (
            <Chip key={id + '-player-' + index + '-' + player} style={{marginRight: 4, marginBottom: 4}} compact>
              {player}
            </Chip>
          ))
        ) : (
          <Text style={{textAlign: 'center'}}>{t('server.player_list.no_players')}</Text>
        )}
      </Card.Content>
    </Card>
  );
};
