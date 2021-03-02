import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import { IntlProvider } from 'react-intl';
import frMessages from 'translations/fr.json';

import configureStore from 'redux/store';
import { Provider } from 'react-redux';
import flattenMessages from 'services/i18n/intl';
import * as hooks from 'redux/Cause/hooks';
import * as selectors from 'redux/Cause/selectors';
import CauseList from './CauseList';
import { CAUSES_MOCK } from 'redux/Cause/fixtures';

describe('<CauseList />', () => {
  let wrapper: ReactWrapper<{}, {}>;

  const dispatch = jest.fn();
  const { store } = configureStore({});
  store.dispatch = dispatch;
  const doFetchCauses = jest.fn();

  describe('render', () => {
    it('should fetch cause list', () => {
      jest
        .spyOn(hooks, 'useFetchCauses')
        .mockImplementation(() => [{ loading: false }, doFetchCauses]);
      mount(
        <IntlProvider locale="fr" messages={flattenMessages(frMessages)}>
          <Provider store={store}>
            <CauseList />
          </Provider>
        </IntlProvider>,
      );
      expect(hooks.useFetchCauses).toHaveBeenCalled();
    });

    it('should display loader when loading', () => {
      jest
        .spyOn(hooks, 'useFetchCauses')
        .mockImplementation(() => [{ loading: true }, doFetchCauses]);
      const wrapper = mount(
        <IntlProvider locale="fr" messages={flattenMessages(frMessages)}>
          <Provider store={store}>
            <CauseList />
          </Provider>
        </IntlProvider>,
      );
      expect(wrapper.find('Loader')).toHaveLength(1);
    });

    it('should display error messages', () => {
      jest
        .spyOn(hooks, 'useFetchCauses')
        .mockImplementation(() => [{ loading: false, error: new Error('error') }, doFetchCauses]);
      const wrapper = mount(
        <IntlProvider locale="fr" messages={{}} onError={() => ''}>
          <Provider store={store}>
            <CauseList />
          </Provider>
        </IntlProvider>,
      );
      expect(wrapper.text()).toContain('cause_list.error');
    });

    it('should display no causes messages', () => {
      jest
        .spyOn(hooks, 'useFetchCauses')
        .mockImplementation(() => [{ loading: false }, doFetchCauses]);
      jest.spyOn(selectors, 'getCauses').mockReturnValue([]);
      const wrapper = mount(
        <IntlProvider locale="fr" messages={{}} onError={() => ''}>
          <Provider store={store}>
            <CauseList />
          </Provider>
        </IntlProvider>,
      );
      expect(wrapper.text()).toContain('cause_list.no_cause');
    });

    it('should display causes', () => {
      jest
        .spyOn(hooks, 'useFetchCauses')
        .mockImplementation(() => [{ loading: false }, doFetchCauses]);
      jest.spyOn(selectors, 'getCauses').mockReturnValue(CAUSES_MOCK);
      const wrapper = mount(
        <IntlProvider locale="fr" messages={{}} onError={() => ''}>
          <Provider store={store}>
            <CauseList />
          </Provider>
        </IntlProvider>,
      );
      expect(wrapper.find('Cause')).toHaveLength(2);
    });
  });
});
