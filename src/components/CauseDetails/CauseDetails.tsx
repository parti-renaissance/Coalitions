import React, { useState, ChangeEvent, FunctionComponent } from 'react';
import {
  Container,
  HeaderContainer,
  CauseImage,
  TabsWrapper,
  StyledTab,
  DesktopHeaderWrapper,
  MobileHeaderWrapper,
  TabPanelContainer,
} from './CauseDetails.style';
import { FormattedMessage } from 'react-intl';
import { colorPalette } from 'stylesheet';
import { Tabs } from '@material-ui/core';
import AboutThisCause from './components/AboutThisCause';
import { CreateCauseCTA } from 'pages/CauseList/CreateCauseCTA/CreateCauseCTA';
import { InCreationCause, Cause } from 'redux/Cause/types';
import Header from './components/Header';
import { Supported } from 'components/Cause/Cause.style';
import HeaderButtons from './components/HeaderButtons';
import EmptySection from './components/EmptySection';

interface CauseDetailsProps {
  cause: Cause | InCreationCause;
  onSupport?: () => void;
  isSupporting?: boolean;
}

const TAB_INDICATOR_PROPS = {
  style: {
    backgroundColor: colorPalette.mintGreen2,
  },
};

const CauseDetails: FunctionComponent<CauseDetailsProps> = ({ cause, onSupport, isSupporting }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const isPreview = Boolean(!onSupport);
  const isSupported = Boolean(cause.supported);

  const onTabIndexChange = (_: ChangeEvent<{}>, value: number) => {
    setTabIndex(value);
  };

  const renderTabPanel = () => {
    switch (tabIndex) {
      case 0:
        return <AboutThisCause cause={cause} />;
      default:
        return (
          <EmptySection labelKey="cause.coming-feature" imageSrc="/images/eventsPlaceholder.svg" />
        );
    }
  };

  const renderHeader = () => (
    <Header cause={cause} onSupport={onSupport} isSupporting={isSupporting} />
  );

  return (
    <>
      <DesktopHeaderWrapper>{renderHeader()}</DesktopHeaderWrapper>
      <Container>
        <HeaderContainer>
          <CauseImage backgroundImage={cause.image_url} />
          {isSupported ? (
            <Supported>
              <FormattedMessage id="cause.supported" />
            </Supported>
          ) : null}
          <MobileHeaderWrapper>{renderHeader()}</MobileHeaderWrapper>
        </HeaderContainer>
        <TabsWrapper>
          <Tabs
            value={tabIndex}
            onChange={onTabIndexChange}
            TabIndicatorProps={TAB_INDICATOR_PROPS}
          >
            <StyledTab label={<FormattedMessage id="cause.about.title" />} />
            <StyledTab label={<FormattedMessage id="cause.events.title" />} />
            <StyledTab label={<FormattedMessage id="cause.discussions.title" />} />
          </Tabs>
          <TabPanelContainer>{renderTabPanel()}</TabPanelContainer>
        </TabsWrapper>
      </Container>
      {!isPreview ? <CreateCauseCTA displayLinkToCauseList /> : null}
      <HeaderButtons cause={cause} onSupport={onSupport} isSupporting={isSupporting} isMobile />
    </>
  );
};

export default CauseDetails;
