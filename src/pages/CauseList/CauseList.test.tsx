import { mount } from 'enzyme';
import React from 'react';

import configureStore from 'redux/store';
import * as hooks from 'redux/Cause/hooks/useFetchCauses';
import * as coalitionsHooks from 'redux/Coalition/hooks';
import CauseList from './CauseList';
import { CAUSES_MOCK_STORE } from 'redux/Cause/fixtures';
import { TestProvider } from 'services/test/TestProvider';
import { COALITIONS_STORE } from 'redux/Coalition/fixtures';

jest.mock('react-router', () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: '/cause-list',
    search: '',
  }),
  useHistory: jest.fn().mockReturnValue({
    replace: jest.fn(),
  }),
}));

describe('<CauseList />', () => {
  const dispatch = jest.fn();
  const { store } = configureStore({});
  store.dispatch = dispatch;
  const fetchFirstPage = jest.fn();
  const fetchNextPage = jest.fn();
  const mockUseFetchCauses = {
    fetchFirstPage,
    fetchNextPage,
    hasMore: true,
    loading: false,
    error: undefined,
  };

  const mockUseFetchCoalitions = {
    fetchCoalitions: jest.fn(),
    isFetchingCoalitions: false,
  };

  describe('render', () => {
    it('should fetch cause list', () => {
      jest.spyOn(hooks, 'useFetchCauses').mockImplementation(() => mockUseFetchCauses);
      mount(
        <TestProvider dispatch={dispatch}>
          <CauseList />
        </TestProvider>,
      );
      expect(mockUseFetchCauses.fetchFirstPage).toHaveBeenCalled();
    });

    it('should display loader when loading', () => {
      jest.spyOn(hooks, 'useFetchCauses').mockImplementation(() => {
        return { ...mockUseFetchCauses, loading: true };
      });
      const wrapper = mount(
        <TestProvider dispatch={dispatch}>
          <CauseList />
        </TestProvider>,
      );
      expect(wrapper.find('Loader')).toHaveLength(1);
    });

    it('should display no causes messages', () => {
      jest.spyOn(hooks, 'useFetchCauses').mockImplementation(() => mockUseFetchCauses);
      const wrapper = mount(
        <TestProvider dispatch={dispatch} partialState={{ cause: { causes: {}, ids: [] } }}>
          <CauseList />
        </TestProvider>,
      );
      expect(wrapper.text()).toContain('cause_list.no_cause');
    });

    it('should display causes', () => {
      jest.spyOn(hooks, 'useFetchCauses').mockImplementation(() => mockUseFetchCauses);
      jest
        .spyOn(coalitionsHooks, 'useFetchCoalitions')
        .mockImplementation(() => mockUseFetchCoalitions);
      const wrapper = mount(
        <TestProvider partialState={{ cause: CAUSES_MOCK_STORE, coalition: COALITIONS_STORE }}>
          <CauseList />
        </TestProvider>,
      );
      expect(wrapper.find('Cause')).toHaveLength(2);
      expect(wrapper.find('StyledChip')).toHaveLength(4);
    });
  });
});
