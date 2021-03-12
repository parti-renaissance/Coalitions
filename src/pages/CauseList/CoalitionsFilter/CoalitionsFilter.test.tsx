import { mount } from 'enzyme';
import React from 'react';
import * as coalitionsHooks from 'redux/Coalition/hooks';

import { TestProvider } from 'services/test/TestProvider';
import { COALITIONS_STORE } from 'redux/Coalition/fixtures';
import { CoalitionsFilter } from './CoalitionsFilter';

describe('<CoalitionsFilter />', () => {
  const mockUseFetchCoalitions = {
    fetchCoalitions: jest.fn(),
  };

  it('should display coalitions', () => {
    const handleCoalitionsFilterClickMock = jest.fn();
    jest
      .spyOn(coalitionsHooks, 'useFetchCoalitions')
      .mockImplementation(() => mockUseFetchCoalitions);
    const wrapper = mount(
      <TestProvider partialState={{ coalition: COALITIONS_STORE }}>
        <CoalitionsFilter handleCoalitionsFilterClick={handleCoalitionsFilterClickMock} />
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
        <CoalitionsFilter handleCoalitionsFilterClick={handleCoalitionsFilterClickMock} />
      </TestProvider>,
    );
    expect(wrapper.find('StyledChip')).toHaveLength(0);
  });

  it('should filter when general chip is clicked', () => {
    const handleCoalitionsFilterClickMock = jest.fn();
    jest
      .spyOn(coalitionsHooks, 'useFetchCoalitions')
      .mockImplementation(() => mockUseFetchCoalitions);
    const wrapper = mount(
      <TestProvider partialState={{ coalition: COALITIONS_STORE }}>
        <CoalitionsFilter handleCoalitionsFilterClick={handleCoalitionsFilterClickMock} />
      </TestProvider>,
    );
    const styledChips = wrapper.find('StyledChip');
    expect(styledChips).toHaveLength(4);
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
        <CoalitionsFilter handleCoalitionsFilterClick={handleCoalitionsFilterClickMock} />
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