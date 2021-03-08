import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import frMessages from 'translations/fr.json';
import flattenMessages from 'services/i18n/intl';

import Cause from './Cause';
import { CAUSE_MOCK } from 'redux/Cause/fixtures';
import { TestProvider } from 'services/test/TestProvider';

jest.mock('react-router-dom', () => ({
  Link: 'Link',
}));

describe('render', () => {
  let wrapper: ReactWrapper<{}, {}>;

  beforeEach(() => {
    wrapper = mount(
      <TestProvider messages={flattenMessages(frMessages)}>
        <Cause cause={CAUSE_MOCK} />
      </TestProvider>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display cause information', () => {
    expect(wrapper.find('CoalitionName').text()).toEqual('Coalition #1');
    expect(wrapper.find('CauseName').text()).toEqual('Cause #1');
    expect(wrapper.find('Author').text()).toEqual('Par Charles G');
    expect(wrapper.find('ButtonContainer').text()).toContain('Soutenir');
    expect(wrapper.find('ButtonContainer').text()).toContain('Voir');
  });
});
