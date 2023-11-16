import {format} from 'date-fns';
import React from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {StoreContext} from '../context/Store.context';
import withApiKey from '../hoc/withApiKey.hoc';
import {type ScreenDetails} from '../types/ScreenDetails.type';
import ScreenWrapper from '../ScreenWrapper';
import {LabelValue} from '../components/LabelValue';
import {NoResults} from '../components/NoResults';
import {LevelProgress} from '../components/Progress';
import {formatter} from '../services';
import {PanthorService} from '../services/Panthor.service';
import {ScreenActivityIndicator} from '../components/ScreenActivityIndicator.component';
import {useTranslation} from 'react-i18next';

export type PlayerProfileScreenProps = {};

export const PlayerProfileScreen: React.FC<PlayerProfileScreenProps> = () => {
  const {t} = useTranslation();
  const {apiKey, loading, setLoading, refreshing, setRefreshing, profile, setProfile} = React.useContext(StoreContext);

  const handler = {
    fetchData: async () => {
      if (!apiKey) return;
      const newProfile = await PanthorService.getProfile(apiKey);
      setProfile(newProfile);
    },
    onRefresh: () => {
      setRefreshing(true);
      handler.fetchData().finally(() => setRefreshing(false));
    },
  };

  React.useEffect(() => {
    setLoading(true);
    handler.fetchData().finally(() => setLoading(false));
  }, [apiKey]);

  if (loading) {
    return <ScreenActivityIndicator />;
  }
  return (
    <ScreenWrapper
      contentContainerStyle={{padding: 16}}
      refreshControl={{
        refreshing: refreshing,
        onRefresh: handler.onRefresh,
      }}>
      {profile != null ? (
        <React.Fragment>
          <Card style={{marginBottom: 16, padding: 16}}>
            <Avatar.Image
              source={{uri: profile.avatar_full}}
              size={80}
              style={{marginLeft: 'auto', marginRight: 'auto'}}
            />
            <Text variant="titleMedium" style={{textAlign: 'center'}}>
              {profile.name}
            </Text>
            <Text variant="titleSmall" style={{textAlign: 'center'}}>
              {profile.pid}
            </Text>
            <LevelProgress currentLevel={profile.level} progress={profile.level_progress} />
          </Card>

          <Card style={{padding: 16}}>
            <LabelValue label={t('profile.player_screen.name')} value={profile.name} />
            <LabelValue label={t('profile.player_screen.player_id')} value={profile.pid} withDivider />
            <LabelValue label={t('profile.player_screen.cash')} value={formatter.format(profile.cash)} withDivider />
            <LabelValue
              label={t('profile.player_screen.bank_account_balance')}
              value={formatter.format(profile.bankacc)}
              withDivider
            />
            <LabelValue
              label={t('profile.player_screen.experience')}
              value={t('profile.player_screen.experience_gained', {experience: profile.exp.toLocaleString()})}
              withDivider
            />
            <LabelValue
              label={t('profile.player_screen.skillpoints')}
              value={t('profile.player_screen.skillpoints_left', {skillpoints: profile.skillpoint})}
              withDivider
            />
            <LabelValue
              label={t('profile.player_screen.playtime.active')}
              value={t('profile.player_screen.playtime.active_value', {
                hours: (profile.play_time.active / 60).toFixed(0),
              })}
              withDivider
            />
            <LabelValue
              label={t('profile.player_screen.playtime.total')}
              value={t('profile.player_screen.playtime.total_value', {
                hours: (profile.play_time.total / 60).toFixed(0),
              })}
              withDivider
            />
            <LabelValue
              label={t('profile.player_screen.last_seen')}
              value={t('profile.player_screen.last_seen_value', {
                time: format(profile.last_seen.date, 'dd.MM.yy, HH:mm'),
              })}
              withDivider
            />
            <LabelValue
              label={t('profile.player_screen.joined_at')}
              value={t('profile.player_screen.joined_at_value', {time: format(profile.joined_at, 'dd.MM.yy, HH:mm')})}
              withDivider
            />
          </Card>
        </React.Fragment>
      ) : (
        <NoResults />
      )}
    </ScreenWrapper>
  );
};

export default withApiKey(PlayerProfileScreen);

export const PlayerProfileScreenDetails: ScreenDetails<PlayerProfileScreenProps> = {
  name: 'Profile',
  label: 'Profil',
  label_key: 'profile.player_screen.title',
  icon: 'account-circle',
  component: withApiKey(PlayerProfileScreen),
};
