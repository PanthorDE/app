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

export type PlayerProfileScreenProps = {};

export const PlayerProfileScreen: React.FC<PlayerProfileScreenProps> = () => {
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
            <LabelValue label="Name" value={profile.name} />
            <LabelValue label="PlayerId" value={profile.pid} withDivider />
            <LabelValue label="Bargeld" value={formatter.format(profile.cash)} withDivider />
            <LabelValue label="Kontostand (Hauptkonto)" value={formatter.format(profile.bankacc)} withDivider />
            <LabelValue label="XP" value={profile.exp.toLocaleString() + ' XP.'} withDivider />
            <LabelValue label="Skillpunkte" value={profile.skillpoint + ' Punkte'} withDivider />
            <LabelValue label="Spielzeit" value={(profile.play_time.active / 60).toFixed(0) + ' Stunden'} withDivider />
            <LabelValue
              label="Volle Spielzeit"
              value={(profile.play_time.total / 60).toFixed(0) + ' Stunden'}
              withDivider
            />
            <LabelValue
              label="Zuletzt gesehen"
              value={format(profile.last_seen.date, 'dd.MM.yy, HH:mm') + ' Uhr'}
              withDivider
            />
            <LabelValue label="Beigetreten" value={format(profile.joined_at, 'dd.MM.yy, HH:mm') + ' Uhr'} withDivider />
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
  icon: 'account-circle',
  component: withApiKey(PlayerProfileScreen),
};
