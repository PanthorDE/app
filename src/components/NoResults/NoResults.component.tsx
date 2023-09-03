import React from 'react';
import {View} from 'react-native';
import {Card, type CardProps, Text} from 'react-native-paper';
import {Icon, IconSize, type IconProps} from '../Icon';

export type NoResultsReason = 'NO_RESULTS' | 'NETWORK_ERR' | 'MISSING_API_KEY' | 'UNKNOWN';

export type NoResultsProps = Pick<CardProps, 'style'> & {
  reason?: NoResultsReason;
  title?: string;
  text?: string;
  icon?: IconProps['icon'];
};

export const NoResults: React.FC<NoResultsProps> = ({
  reason = 'NO_RESULTS',
  icon = getIcon(reason),
  title = getHeading(reason),
  text = getText(reason),
  style,
}) => {
  return (
    <Card style={[style, {padding: 16, marginBottom: 16}]}>
      <View style={{display: 'flex', alignItems: 'center'}}>
        <Icon icon={icon} size={IconSize.medium} style={{borderRadius: 50}} />
      </View>
      <Text variant="titleMedium" style={{textAlign: 'center'}}>
        {title}
      </Text>
      <Text variant="bodyMedium" style={{textAlign: 'center'}}>
        {text}
      </Text>
    </Card>
  );
};

function getIcon(reason: NoResultsReason): string {
  switch (reason) {
    case 'MISSING_API_KEY':
      return 'account-key';

    case 'NETWORK_ERR':
      return 'access-point-network-off';

    case 'NO_RESULTS':
      return 'text-search';

    case 'UNKNOWN':
    default:
      return 'help-circle-outline';
  }
}

function getHeading(reason: NoResultsReason): string {
  switch (reason) {
    case 'MISSING_API_KEY':
      return 'Fehlender API-Key';

    case 'NETWORK_ERR':
      return 'Netzwerkfehler';

    case 'NO_RESULTS':
      return 'Keine Ergebnisse';

    case 'UNKNOWN':
    default:
      return 'Unbekannter Fehler';
  }
}

function getText(reason: NoResultsReason): string {
  switch (reason) {
    case 'MISSING_API_KEY':
      return 'Es wurde kein gültiger API-Key gefunden. Gehe in die Einstellungen und überprüfe diese.';

    case 'NETWORK_ERR':
      return 'Es ist ein Netzwerkfehler aufgetreten. Prüfe deine Verbindung.';

    case 'NO_RESULTS':
      return 'Es wurden keine Ergebnisse gefunden';

    case 'UNKNOWN':
    default:
      return 'Es ist ein unbekannter Fehler aufgetreten.';
  }
}
