import { mount } from 'enzyme';
import React from 'react';
import * as coalitionsHooks from 'redux/Coalition/hooks/useFetchCoalitions';

import { TestProvider } from 'services/test/TestProvider';
import { COALITIONS_STORE } from 'redux/Coalition/fixtures';
import { CoalitionsFilter } from './CoalitionsFilter';

jest.mock('react-router', () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: '/causes',
    search: '',
  }),
  useHistory: jest.fn().mockReturnValue({
    replace: jest.fn(),
  }),
}));

describe('<CoalitionsFilter />', () => {
  const mockUseFetchCoalitions = {
    fetchCoalitions: jest.fn(),
    isFetchingCoalitions: false,
  };

  it('should display coalitions', () => {
    const handleCoalitionsFilterClickMock = jest.fn();
    jest
      .spyOn(coalitionsHooks, 'useFetchCoalitions')
      .mockImplementation(() => mockUseFetchCoalitions);
    const wrapper = mount(
      <TestProvider partialState={{ coalition: COALITIONS_STORE }}>
        <CoalitionsFilter
          setSelectedCoalitionIds={handleCoalitionsFilterClickMock}
          selectedCoalitionIds={[]}
        />
      </TestProvider>,
    );
    expect(wrapper.find('StyledChip')).toHaveLength(4);
  });

  it('should display nothing if there is no coalition', () => {
    const handleCoalitionsFilterClickMock = jest.fn();
    jest
      .spyOn(coalitionsHooks, 'useFetchCoalitions')
      .mockImplementation(() => mockUseFetchCoalitions);
    const wrapper = mount(
      <TestProvider>
        <CoalitionsFilter
          setSelectedCoalitionIds={handleCoalitionsFilterClickMock}
          selectedCoalitionIds={[]}
        />
      </TestProvider>,
    );
    expect(wrapper.find('StyledChip')).toHaveLength(0);
  });

  it('should reset filter when general chip is clicked', () => {
    const handleCoalitionsFilterClickMock = jest.fn();
    jest
      .spyOn(coalitionsHooks, 'useFetchCoalitions')
      .mockImplementation(() => mockUseFetchCoalitions);
    const wrapper = mount(
      <TestProvider partialState={{ coalition: COALITIONS_STORE }}>
        <CoalitionsFilter
          setSelectedCoalitionIds={handleCoalitionsFilterClickMock}
          selectedCoalitionIds={[]}
        />
      </TestProvider>,
    );
    const styledChips = wrapper.find('StyledChip');
    expect(styledChips).toHaveLength(4);
    // First select a random filter
    styledChips.at(1).simulate('click');
    wrapper.update();
    // Then click on the All filter
    styledChips.at(0).simulate('click');
    wrapper.update();
    expect(handleCoalitionsFilterClickMock).toHaveBeenCalledWith([]);
  });

  it('should filter when a chip is clicked', () => {
    const handleCoalitionsFilterClickMock = jest.fn();
    jest
      .spyOn(coalitionsHooks, 'useFetchCoalitions')
      .mockImplementation(() => mockUseFetchCoalitions);
    const wrapper = mount(
      <TestProvider partialState={{ coalition: COALITIONS_STORE }}>
        <CoalitionsFilter
          setSelectedCoalitionIds={handleCoalitionsFilterClickMock}
          selectedCoalitionIds={[]}
        />
      </TestProvider>,
    );
    const styledChips = wrapper.find('StyledChip');
    expect(styledChips).toHaveLength(4);
    styledChips.at(2).simulate('click');
    wrapper.update();
    expect(handleCoalitionsFilterClickMock).toHaveBeenCalledWith([
      '76f36b12-76ab-11eb-8125-42010a840071',
    ]);
  });
});
