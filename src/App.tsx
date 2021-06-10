import React from 'react';

import { Provider } from 'react-redux';

import AppCrashFallback from './components/AppCrashFallback';
import ErrorBoundary from './components/ErrorBoundary';
import Root from './components/Root';
import Routes from './routes';

import { store } from './redux/store';

const App: React.FunctionComponent = () => {
  return (
    <ErrorBoundary FallbackComponent={AppCrashFallback}>
      <Provider store={store}>
        <Root>
          <Routes />
        </Root>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
