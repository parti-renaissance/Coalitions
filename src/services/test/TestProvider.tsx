import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import createMockStore from 'redux-mock-store';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';
import { state as defaultState } from '__fixtures__/state';

// https://gist.github.com/navix/6c25c15e0a2d3cd0e5bce999e0086fc9
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};

interface Props {
  children: ReactNode;
  dispatch?: Dispatch;
  partialState?: DeepPartial<RootState>;
  messages?: Record<string, string>;
}

// Function is super standard https://github.com/substack/deep-freeze
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepFreeze = (o: any) => {
  Object.freeze(o);
  if (o === undefined) {
    return o;
  }

  Object.getOwnPropertyNames(o).forEach(function(prop) {
    if (
      o[prop] !== null &&
      (typeof o[prop] === 'object' || typeof o[prop] === 'function') &&
      !Object.isFrozen(o[prop])
    ) {
      deepFreeze(o[prop]);
    }
  });

  return o;
};

export const TestProvider: React.FunctionComponent<Props> = ({
  children,
  dispatch,
  partialState,
  messages,
}) => {
  // deepFreeze here is very important as otherwise the redux store is not immutable (as it should be) and
  // therefore jest does not catch some bugs that actually happen at runtime (one example so far)
  const store = createMockStore()(deepFreeze({ ...defaultState, ...partialState }));

  if (dispatch) {
    store.dispatch = dispatch;
  }

  return (
    <IntlProvider locale="fr" messages={messages ?? {}} onError={() => ''}>
      <Provider store={store}>{children}</Provider>
    </IntlProvider>
  );
};
