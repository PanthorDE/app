import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import ScreenWrapper from '../ScreenWrapper';
import { ScreenDetails } from '../types/ScreenDetails.type';
import withApiKey from '../hoc/withApiKey.hoc';
import { View } from 'react-native';
import { StoreContext } from '../context/Store.context';
import { PanthorService } from '../services/Panthor.service';
import { NoResults } from '../components/NoResults';
import { PhonebookWrapper } from '../components/Phonebook';

export type PhonebookScreenProps = {};

const PhonebookScreen: React.FC<PhonebookScreenProps> = () => {
  const { loading, setLoading, refreshing, setRefreshing, profile, setProfile, apiKey } =
    React.useContext(StoreContext);

  const phonebooks = React.useMemo(() => {
    if (!profile) return [];
    return profile.phonebooks;
  }, [profile]);

  const handler = {
    fetchData: async function () {
      try {
        if (!apiKey) return;
        const newProfile = await PanthorService.getProfile(apiKey);
        setProfile(newProfile);
      } catch (error) {
        console.error(error);
        // FIXME: Add error-handling
      }
    },
    onRefresh: () => {
      setRefreshing(true);
      handler.fetchData().finally(() => setRefreshing(false));
    },
  };

  React.useEffect(() => {
    setLoading(true);
    handler.fetchData().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={{ padding: 16 }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScreenWrapper
      contentContainerStyle={{ padding: 16 }}
      refreshControl={{
        refreshing: refreshing,
        onRefresh: handler.onRefresh,
      }}
    >
      {phonebooks.length > 0 ? (
        <PhonebookWrapper phonebooks={phonebooks} />
      ) : (
        <NoResults message="Keine Telefonbücher gefunden" reason="NO_RESULTS" />
      )}
    </ScreenWrapper>
  );
};

export default withApiKey(PhonebookScreen);

export const PhonebookScreenDetails: ScreenDetails<PhonebookScreenProps> = {
  name: 'Phonebook',
  label: 'Telefonbücher',
  icon: 'contacts',
  component: withApiKey(PhonebookScreen),
};
