import React, { useState, ChangeEvent, FunctionComponent } from 'react';
import { Container, Tab, PanelContainer, Tabs } from './TabsWrapper.style';
import { colorPalette } from 'stylesheet';

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
    <Container>
      <Tabs value={tabIndex} onChange={onTabIndexChange} TabIndicatorProps={TAB_INDICATOR_PROPS}>
        {tabsLabel.map(tabLabel => (
          <Tab label={tabLabel} key={tabLabel.key} />
        ))}
      </Tabs>
      <PanelContainer>{renderTabPanel(tabIndex)}</PanelContainer>
    </Container>
  );
};
