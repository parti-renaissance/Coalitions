import React, { useState, FunctionComponent } from 'react';
import { PanelContainer } from './TabBarAndPanel.style';
import TabBar from 'components/TabBar';

interface TabBarAndPanelProps {
  renderTabPanel: (tab: number) => JSX.Element;
  tabLabels: JSX.Element[];
  isSticky?: boolean;
}

const TabBarAndPanel: FunctionComponent<TabBarAndPanelProps> = ({
  renderTabPanel,
  tabLabels,
  isSticky,
}) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  return (
    <div>
      <TabBar
        tabLabels={tabLabels}
        selectedTabIndex={selectedTabIndex}
        setSelectedTabIndex={setSelectedTabIndex}
        isSticky={isSticky}
      />
      <PanelContainer>{renderTabPanel(selectedTabIndex)}</PanelContainer>
    </div>
  );
};

export default TabBarAndPanel;
