import React from 'react';
import {Card, ActivityIndicator} from 'react-native-paper';
import ScreenWrapper from '../ScreenWrapper';
import {ScreenDetails} from '../types/ScreenDetails.type';
import {StoreContext} from '../context/Store.context';
import {RpgServer, Server} from '../models';
import {type ServerProps, Server as ServerComponent} from '../components/Server';
import {PanthorService} from '../services/Panthor.service';
import {Playerlist} from '../components/Playerlist';
import {HorizontalCardList} from '../components/Card';
import {NoResults} from '../components/NoResults';

export type HomeScreenProps = {};

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const {loading, setLoading, refreshing, setRefreshing, servers, setServers} = React.useContext(StoreContext);
  const [selectedServer, setSelectedServer] = React.useState<RpgServer | Server | null>(null);

  const playerList = React.useMemo(() => {
    return selectedServer ? selectedServer.players : [];
  }, [selectedServer]);

  const handler = {
    fetchData: async () => {
      const serverList = await PanthorService.getServers();
      setServers(serverList);
      setSelectedServer(serverList[0]);
    },
    onRefresh: () => {
      setRefreshing(true);
      handler.fetchData().finally(() => setRefreshing(false));
    },
    onServerPress: (server: ServerProps['server']) => {
      if (!selectedServer || server.id === selectedServer.id) return;
      setSelectedServer(server);
    },
  };

  React.useEffect(() => {
    handler.fetchData().finally(() => setLoading(false));
  }, []);

  return (
    <ScreenWrapper
      contentContainerStyle={{padding: 16}}
      refreshControl={{
        refreshing: refreshing,
        onRefresh: handler.onRefresh,
      }}>
      {loading ? (
        <Card elevation={1} style={{padding: 16}}>
          <ActivityIndicator />
        </Card>
      ) : servers.length > 0 ? (
        <HorizontalCardList
          // Maybe we don't wanna change the displayed player-list on every card-scroll
          // onScroll={(curIdx) => handler.onCardPress(servers[curIdx])}
          cards={servers.map((server, _idx, arr) => (
            <ServerComponent
              key={'server-' + server.id}
              server={server}
              onPress={arr.length > 1 ? handler.onServerPress : undefined}
            />
          ))}
        />
      ) : (
        <NoResults />
      )}

      {servers.length > 0 && <Playerlist players={playerList} />}
    </ScreenWrapper>
  );
};

export const HomeScreenDetails: ScreenDetails<HomeScreenProps> = {
  name: 'ServerList',
  label: 'Serverliste',
  label_key: 'home.screen.title',
  icon: 'home',
  component: HomeScreen,
};
