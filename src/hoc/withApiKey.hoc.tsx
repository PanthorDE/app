import React from 'react';
import {StoreContext} from '../context/Store.context';
import {NoApiKey} from '../components/Alert/NoApiKey.component';
import ScreenWrapper from '../ScreenWrapper';

const withApiKey = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const EnhancedComponent: React.FC<P> = props => {
    const {apiKey} = React.useContext(StoreContext);

    const isApiKeySet = apiKey != null && apiKey.length > 0;

    if (isApiKeySet) {
      return <WrappedComponent {...props} />;
    }

    return (
      <ScreenWrapper>
        <NoApiKey />
      </ScreenWrapper>
    );
  };

  EnhancedComponent.displayName = `withApiKey(${WrappedComponent.displayName || WrappedComponent.name})`;

  return EnhancedComponent;
};

export default withApiKey;
