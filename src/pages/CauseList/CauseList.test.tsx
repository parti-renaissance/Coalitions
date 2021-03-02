import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import configureStore from 'redux/store';
import * as hooks from 'redux/Cause/hooks';
import CauseList from './CauseList';
import { CAUSES_MOCK } from 'redux/Cause/fixtures';
import { TestProvider } from 'services/test/TestProvider';

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
        <TestProvider dispatch={dispatch}>
          <CauseList />
        </TestProvider>,
      );
      expect(hooks.useFetchCauses).toHaveBeenCalled();
    });

    it('should display loader when loading', () => {
      jest
        .spyOn(hooks, 'useFetchCauses')
        .mockImplementation(() => [{ loading: true }, doFetchCauses]);
      const wrapper = mount(
        <TestProvider dispatch={dispatch}>
          <CauseList />
        </TestProvider>,
      );
      expect(wrapper.find('Loader')).toHaveLength(1);
    });

    it('should display error messages', () => {
      jest
        .spyOn(hooks, 'useFetchCauses')
        .mockImplementation(() => [{ loading: false, error: new Error('error') }, doFetchCauses]);
      const wrapper = mount(
        <TestProvider dispatch={dispatch}>
          <CauseList />
        </TestProvider>,
      );
      expect(wrapper.text()).toContain('cause_list.error');
    });

    it('should display no causes messages', () => {
      jest
        .spyOn(hooks, 'useFetchCauses')
        .mockImplementation(() => [{ loading: false }, doFetchCauses]);
      const wrapper = mount(
        <TestProvider dispatch={dispatch} partialState={{ cause: { causes: [] } }}>
          <CauseList />
        </TestProvider>,
      );
      expect(wrapper.text()).toContain('cause_list.no_cause');
    });

    it('should display causes', () => {
      jest
        .spyOn(hooks, 'useFetchCauses')
        .mockImplementation(() => [{ loading: false }, doFetchCauses]);
      const wrapper = mount(
        <TestProvider partialState={{ cause: { causes: CAUSES_MOCK } }}>
          <CauseList />
        </TestProvider>,
      );
      expect(wrapper.find('Cause')).toHaveLength(2);
    });
  });
});
