import * as React from 'react';
import { ActivityIndicator, List, Text } from 'react-native-paper';
import ScreenWrapper from '../ScreenWrapper';
import { ScreenDetails } from '../types/ScreenDetails.type';
import { StoreContext } from '../context/Store.context';
import withApiKey from '../hoc/withApiKey.hoc';
import { View } from 'react-native';
import { NoResults } from '../components/NoResults';
import { Building, House, Rental } from '../components/House';
import { Profile } from '../models';
import { PanthorService } from '../services/Panthor.service';

export type PlayerHousesScreenProps = {};

const PlayerHousesScreen: React.FC<PlayerHousesScreenProps> = () => {
  const { apiKey, loading, setLoading, refreshing, setRefreshing, profile, setProfile } =
    React.useContext(StoreContext);
  const [houses, setHouses] = React.useState<{
    houses: ReturnType<Profile['getHouses']>;
    rentals: Profile['rentals'];
    buildings: ReturnType<Profile['getBuildings']>;
  }>({
    houses: [],
    rentals: [],
    buildings: [],
  });
  const [currentHouse, setCurrentHouse] = React.useState<number | string | null>(null);

  const handler = {
    fetchData: async function () {
      try {
        if (!apiKey) return;
        const newProfile = await PanthorService.getProfile(apiKey);
        setProfile(newProfile);
        setHouses({
          houses: newProfile.getHouses(),
          rentals: newProfile.rentals,
          buildings: newProfile.getBuildings(),
        });
      } catch (error) {
        console.error(error);
        // FIXME: Add error-handling
      }
    },
    onRefresh: () => {
      setRefreshing(true);
      handler.fetchData().finally(() => setRefreshing(false));
    },
    onAccordionPress: (expandedId: number | string) => {
      setCurrentHouse((cur) => (cur == expandedId ? null : Number(expandedId)));
    },
  };

  React.useEffect(() => {
    setLoading(true);
    handler.fetchData().finally(() => setLoading(false));
  }, [apiKey]);

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
      <List.AccordionGroup expandedId={currentHouse} onAccordionPress={handler.onAccordionPress}>
        <List.Section>
          {houses.houses.length > 0 ? (
            houses.houses.map((house, index, arr) => (
              <House
                key={house.id}
                house={house}
                isFirst={index === 0}
                isLast={index === arr.length - 1}
                isExpanded={currentHouse === house.id}
              />
            ))
          ) : (
            <NoResults message="Es konnten keine Häuser gefunden werden" icon="home-search-outline" />
          )}
        </List.Section>

        <List.Section>
          {houses.rentals.length > 0 ? (
            houses.rentals.map((rental, index, arr) => (
              <Rental
                key={rental.id}
                rental={rental}
                isFirst={index === 0}
                isLast={index === arr.length - 1}
                isExpanded={currentHouse === rental.id}
              />
            ))
          ) : (
            <NoResults message="Es wurde kein Appartment gefunden" icon="home-search-outline" />
          )}
        </List.Section>

        <List.Section>
          {houses.buildings.length > 0 ? (
            houses.buildings.map((building, index, arr) => (
              <Building
                key={building.id}
                building={building}
                isFirst={index === 0}
                isLast={index === arr.length - 1}
                isExpanded={currentHouse === building.id}
              />
            ))
          ) : (
            <NoResults message="Es wurde keine Baustelle gefunden" icon="home-search-outline" />
          )}
        </List.Section>
      </List.AccordionGroup>
    </ScreenWrapper>
  );
};

export default withApiKey(PlayerHousesScreen);

export const PlayerHousesScreenDetails: ScreenDetails<PlayerHousesScreenProps> = {
  name: 'PlayerHouses',
  label: 'Häuser',
  icon: 'domain',
  component: withApiKey(PlayerHousesScreen),
};
