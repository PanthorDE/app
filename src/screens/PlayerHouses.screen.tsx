import React from 'react';
import {List} from 'react-native-paper';
import ScreenWrapper from '../ScreenWrapper';
import {type ScreenDetails} from '../types/ScreenDetails.type';
import {StoreContext} from '../context/Store.context';
import withApiKey from '../hoc/withApiKey.hoc';
import {NoResults} from '../components/NoResults';
import {Building, House, Rental} from '../components/House';
import {Profile} from '../models';
import {PanthorService} from '../services/Panthor.service';
import {ScreenActivityIndicator} from '../components/ScreenActivityIndicator.component';
import {useTranslation} from 'react-i18next';

export type PlayerHousesScreenProps = {};

const PlayerHousesScreen: React.FC<PlayerHousesScreenProps> = () => {
  const {t} = useTranslation();
  const {apiKey, loading, setLoading, refreshing, setRefreshing, setProfile} = React.useContext(StoreContext);
  const [houses, setHouses] = React.useState<{
    houses: ReturnType<Profile['getHouses']>;
    rentals: Profile['rentals'];
    buildings: ReturnType<Profile['getBuildings']>;
  }>({
    houses: [],
    rentals: [],
    buildings: [],
  });
  const [currentHouse, setCurrentHouse] = React.useState<number | string>(-1);

  const handler = {
    fetchData: async function () {
      try {
        if (!apiKey) return;
        const newProfile = await PanthorService.getProfile(apiKey);
        if (!newProfile) return;
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
      setCurrentHouse(cur => (cur === expandedId ? -1 : Number(expandedId)));
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
            <NoResults icon="home-search-outline" text={t('profile.house_screen.no_houses_text')} />
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
            <NoResults icon="home-search-outline" text={t('profile.house_screen.no_appartments_text')} />
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
            <NoResults icon="home-search-outline" text={t('profile.house_screen.no_constructions_text')} />
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
  label_key: 'profile.house_screen.title',
  icon: 'domain',
  component: withApiKey(PlayerHousesScreen),
};
