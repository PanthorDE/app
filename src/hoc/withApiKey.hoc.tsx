import React from 'react';
import { Text, View } from 'react-native';
import { StoreContext } from '../context/Store.context';

const withApiKey = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const EnhancedComponent: React.FC<P> = (props) => {
    const { apiKey } = React.useContext(StoreContext);

    const isApiKeySet = apiKey != null && apiKey.length > 0;

    if (isApiKeySet) {
      return <WrappedComponent {...props} />;
    }

    // FIXME: Update style
    return (
      <View>
        <Text>API-Key nicht gesetzt</Text>
      </View>
    );
  };

  // EnhancedComponent.displayName = `withApiKey(${WrappedComponent.displayName || WrappedComponent.name})`;

  return EnhancedComponent;
};

export default withApiKey;
