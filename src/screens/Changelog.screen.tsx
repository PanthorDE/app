import * as React from 'react';
import { ActivityIndicator, List, Text } from 'react-native-paper';
import ScreenWrapper from '../ScreenWrapper';
import { ScreenDetails } from '../types/ScreenDetails.type';
import { View } from 'react-native';
import { StoreContext } from '../context/Store.context';
import { Changelog as ChangelogModel } from '../models';
import { PanthorService } from '../services/Panthor.service';
import { Changelog } from '../components/Changelog';
import { NoResults } from '../components/NoResults';

export type ChangelogScreenProps = {};

const ChangelogScreen: React.FC<ChangelogScreenProps> = () => {
  const { loading, setLoading, refreshing, setRefreshing, changelogs, setChangelogs } = React.useContext(StoreContext);
  const [selectedChangelog, setSelectedChangelog] = React.useState<ChangelogModel['id'] | null>(null);

  const handler = {
    fetchData: async () => {
      try {
        setChangelogs(await PanthorService.getChangelogs());
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
      setSelectedChangelog((cur) => (cur == expandedId ? null : Number(expandedId)));
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
      {changelogs.length > 0 ? (
        <List.AccordionGroup expandedId={selectedChangelog} onAccordionPress={handler.onAccordionPress}>
          {changelogs.map((changelog, index, arr) => (
            <Changelog
              key={changelog.id}
              changelog={changelog}
              isFirst={index === 0}
              isLast={index === arr.length - 1}
              isExpanded={selectedChangelog === changelog.id}
            />
          ))}
        </List.AccordionGroup>
      ) : (
        <NoResults message="Keine Changelogs gefunden" reason="NO_RESULTS" />
      )}
    </ScreenWrapper>
  );
};

export default ChangelogScreen;

export const ChangelogScreenDetails: ScreenDetails<ChangelogScreenProps> = {
  name: 'Changelog',
  label: 'Changelogs',
  icon: 'text-box-multiple',
  component: ChangelogScreen,
};
