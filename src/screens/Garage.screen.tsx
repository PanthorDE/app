import React from 'react';
import {ActivityIndicator, Card, List} from 'react-native-paper';
import ScreenWrapper from '../ScreenWrapper';
import {ScreenDetails} from '../types/ScreenDetails.type';
import {StoreContext} from '../context/Store.context';
import {PanthorService} from '../services';
import {Vehicle as VehicleModel} from '../models';
import {NoResults} from '../components/NoResults';
import {Vehicle} from '../components/Vehicle';
import withApiKey from '../hoc/withApiKey.hoc';
import {ScreenActivityIndicator} from '../components/ScreenActivityIndicator.component';

export type GarageScreenProps = {};

const GarageScreen: React.FC<GarageScreenProps> = () => {
  const {loading, setLoading, refreshing, setRefreshing, apiKey, vehicles, setVehicles} =
    React.useContext(StoreContext);
  const [selectedVehicle, setSelectedVehicle] = React.useState<VehicleModel['id']>(-1);

  const activeVehicles = React.useMemo(() => {
    return vehicles.filter(v => !v.disabled).sort((a, b) => b.updated_at.getTime() - a.updated_at.getTime());
  }, [vehicles]);

  const handler = {
    fetchData: async () => {
      try {
        if (!apiKey) return;
        const vehicleList = await PanthorService.getVehicles(apiKey);
        setVehicles(vehicleList);
      } catch (error) {
        console.error(error);
        // FIXME: Add error-handling => redirect to error-page
      }
    },
    onRefresh: () => {
      setRefreshing(true);
      handler.fetchData().finally(() => setRefreshing(false));
    },
    onAccordionPress: (expandedId: number | string) => {
      setSelectedVehicle(cur => (cur === expandedId ? -1 : Number(expandedId)));
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
      {loading ? (
        <Card elevation={1} style={{padding: 16}}>
          <ActivityIndicator animating={true} />
        </Card>
      ) : (
        <React.Fragment>
          {activeVehicles.length > 0 ? (
            <List.AccordionGroup expandedId={selectedVehicle} onAccordionPress={handler.onAccordionPress}>
              {activeVehicles.map((vehicle, index, arr) => (
                <Vehicle
                  key={vehicle.id}
                  vehicle={vehicle}
                  isFirst={index === 0}
                  isLast={index === arr.length - 1}
                  isExpanded={selectedVehicle === vehicle.id}
                />
              ))}
            </List.AccordionGroup>
          ) : (
            <NoResults message="Keine intakten Fahrzeuge gefunden" />
          )}
        </React.Fragment>
      )}
    </ScreenWrapper>
  );
};

export default withApiKey(GarageScreen);

export const GarageScreenDetails: ScreenDetails<GarageScreenProps> = {
  name: 'Garage',
  label: 'Garage',
  icon: 'garage',
  component: withApiKey(GarageScreen),
};
