import React from 'react';
import {View} from 'react-native';
import {Card, type CardProps, Text} from 'react-native-paper';
import {Icon, IconSize, type IconProps} from '../Icon';
import {useTranslation} from 'react-i18next';

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
  title,
  text,
  style,
}) => {
  const {t} = useTranslation();
  const namespace = 'no_results';
  return (
    <Card style={[style, {padding: 16, marginBottom: 16}]}>
      <View style={{display: 'flex', alignItems: 'center'}}>
        <Icon icon={icon} size={IconSize.medium} style={{borderRadius: 50}} />
      </View>
      <Text variant="titleMedium" style={{textAlign: 'center'}}>
        {title || t(`${namespace}.${reason.toLowerCase()}`)}
      </Text>
      <Text variant="bodyMedium" style={{textAlign: 'center'}}>
        {text || t(`${namespace}.${reason.toLowerCase()}_text`)}
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
