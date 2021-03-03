import { mount } from 'enzyme';
import React from 'react';

import configureStore from 'redux/store';
import * as hooks from 'redux/Cause/hooks';
import CauseList from './CauseList';
import { CAUSES_MOCK } from 'redux/Cause/fixtures';
import { TestProvider } from 'services/test/TestProvider';

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

    it('should display error messages', () => {
      jest.spyOn(hooks, 'useFetchCauses').mockImplementation(() => {
        return { ...mockUseFetchCauses, error: new Error('error') };
      });
      const wrapper = mount(
        <TestProvider dispatch={dispatch}>
          <CauseList />
        </TestProvider>,
      );
      expect(wrapper.text()).toContain('cause_list.error');
    });

    it('should display no causes messages', () => {
      jest.spyOn(hooks, 'useFetchCauses').mockImplementation(() => mockUseFetchCauses);
      const wrapper = mount(
        <TestProvider dispatch={dispatch} partialState={{ cause: { causes: [] } }}>
          <CauseList />
        </TestProvider>,
      );
      expect(wrapper.text()).toContain('cause_list.no_cause');
    });

    it('should display causes', () => {
      jest.spyOn(hooks, 'useFetchCauses').mockImplementation(() => mockUseFetchCauses);
      const wrapper = mount(
        <TestProvider partialState={{ cause: { causes: CAUSES_MOCK } }}>
          <CauseList />
        </TestProvider>,
      );
      expect(wrapper.find('Cause')).toHaveLength(2);
    });

    /* it('should load more causes when scrolling', () => {
      jest.spyOn(hooks, 'useFetchCauses').mockImplementation(() => mockUseFetchCauses);
      const wrapper = mount(
        <TestProvider partialState={{ cause: { causes: CAUSES_MOCK } }}>
          <CauseList />
        </TestProvider>,
      );
      const infiniteScroll = wrapper.find('InfiniteScroll');
      expect(infiniteScroll).toHaveLength(1);
      infiniteScroll.simulate('scroll', {
        target: { scrollHeight: 100, scrollTop: -800 },
      });
      expect(mockUseFetchCauses.fetchNextPage).toHaveBeenCalled();
    }); */
  });
});
