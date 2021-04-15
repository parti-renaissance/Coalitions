import React, { useState, ChangeEvent, FunctionComponent } from 'react';
import { TabsContainer, StyledTab, TabPanelContainer } from './TabsWrapper.style';
import { colorPalette } from 'stylesheet';
import { Tabs } from '@material-ui/core';

interface TabsWrapperProps {
  renderTabPanel: (tab: number) => JSX.Element;
  tabsLabel: JSX.Element[];
  initialTabIndex?: number;
}

const TAB_INDICATOR_PROPS = {
  style: {
    backgroundColor: colorPalette.mintGreen2,
  },
};

export const TabsWrapper: FunctionComponent<TabsWrapperProps> = ({
  renderTabPanel,
  tabsLabel,
  initialTabIndex = 0,
}) => {
  const [tabIndex, setTabIndex] = useState<number>(initialTabIndex);

  const onTabIndexChange = (_: ChangeEvent<{}>, value: number) => {
    setTabIndex(value);
  };

  return (
    <TabsContainer>
      <Tabs value={tabIndex} onChange={onTabIndexChange} TabIndicatorProps={TAB_INDICATOR_PROPS}>
        {tabsLabel.map((tabLabel, index) => (
          <StyledTab label={tabLabel} key={tabLabel.key} />
        ))}
      </Tabs>
      <TabPanelContainer>{renderTabPanel(tabIndex)}</TabPanelContainer>
    </TabsContainer>
  );
};
