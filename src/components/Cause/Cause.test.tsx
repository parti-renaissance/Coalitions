import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import { IntlProvider } from 'react-intl';
import frMessages from 'translations/fr.json';
import flattenMessages from 'services/i18n/intl';

import Cause from './Cause';
import { CAUSE_MOCK } from 'redux/Cause/fixtures';

describe('render', () => {
  let wrapper: ReactWrapper<{}, {}>;

  beforeEach(() => {
    wrapper = mount(
      <IntlProvider locale="fr" messages={flattenMessages(frMessages)}>
        <Cause cause={CAUSE_MOCK} />
      </IntlProvider>,
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
