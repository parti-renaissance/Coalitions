import React, { useState, ChangeEvent, FunctionComponent } from 'react';
import {
  Container,
  HeaderContainer,
  CauseImage,
  TabsWrapper,
  StyledTab,
  DesktopHeaderWrapper,
  MobileHeaderWrapper,
  CreateCauseCTAWrapper,
} from './CauseDetails.style';
import { FormattedMessage } from 'react-intl';
import { colorPalette } from 'stylesheet';
import { Tabs } from '@material-ui/core';
import AboutThisCause from './components/AboutThisCause';
import { CreateCauseCTA } from 'pages/CauseList/CreateCauseCTA/CreateCauseCTA';
import { InCreationCause, Cause } from 'redux/Cause/types';
import Header from './components/Header';
import { Supported } from 'components/Cause/Cause.style';
import { Container as StickyMobileButtonsContainer } from 'components/FixedBottomButton/FixedBottomButton.style';
import HeaderButtons from './components/HeaderButtons';

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
        return null;
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
        <TabsWrapper isPreview={isPreview}>
          <Tabs
            value={tabIndex}
            onChange={onTabIndexChange}
            TabIndicatorProps={TAB_INDICATOR_PROPS}
          >
            <StyledTab label={<FormattedMessage id="cause.about.title" />} />
            <StyledTab label={<FormattedMessage id="cause.events.title" />} />
            <StyledTab label={<FormattedMessage id="cause.discussions.title" />} />
          </Tabs>
          {renderTabPanel()}
        </TabsWrapper>
      </Container>
      {!isPreview ? (
        <CreateCauseCTAWrapper>
          <CreateCauseCTA displayLinkToCauseList />
        </CreateCauseCTAWrapper>
      ) : null}
      <StickyMobileButtonsContainer>
        <HeaderButtons cause={cause} onSupport={onSupport} isSupporting={isSupporting} />
      </StickyMobileButtonsContainer>
    </>
  );
};

export default CauseDetails;
