import * as Sentry from '@sentry/browser';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { persistor } from './redux/store';

declare global {
  interface Window {
    config: {
      sentry: {
        dsn: string;
        release: string;
        environment: string;
      };
    };
  }
}

if (
  window.config &&
  window.config.sentry &&
  window.config.sentry.environment !== 'local' &&
  window.config.sentry.dsn
) {
  Sentry.init({
    dsn: window.config.sentry.dsn,
    release: window.config.sentry.release,
    environment: window.config.sentry.environment,
  });
}

const rootEl = document.getElementById('root');

if (rootEl) {
  persistor.subscribe(() => {
    const { bootstrapped } = persistor.getState();

    if (bootstrapped)
      ReactDOM.hydrate(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
        rootEl,
      );
  });
}

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default; // eslint-disable-line
    if (rootEl) {
      ReactDOM.render(
        <BrowserRouter>
          <NextApp />
        </BrowserRouter>,
        rootEl,
      );
    }
  });
}
