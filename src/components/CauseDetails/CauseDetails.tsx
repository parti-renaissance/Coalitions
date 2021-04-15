import React, { FunctionComponent } from 'react';
import {
  Container,
  HeaderContainer,
  CauseImage,
  DesktopHeaderWrapper,
  MobileHeaderWrapper,
} from './CauseDetails.style';
import { FormattedMessage } from 'react-intl';
import { InCreationCause, Cause } from 'redux/Cause/types';
import { CreateCauseCTA } from 'pages/CauseList/CreateCauseCTA/CreateCauseCTA';
import { TabsWrapper } from 'components/TabsWrapper/TabsWrapper';
import { Supported } from 'components/Cause/Cause.style';
import AboutThisCause from './components/AboutThisCause';
import Header from './components/Header';
import HeaderButtons from './components/HeaderButtons';
import EmptySection from './components/EmptySection';

interface CauseDetailsProps {
  cause: Cause | InCreationCause;
  onSupport?: () => void;
  isSupporting?: boolean;
}

const CauseDetails: FunctionComponent<CauseDetailsProps> = ({ cause, onSupport, isSupporting }) => {
  const isPreview = Boolean(!onSupport);
  const isSupported = Boolean(cause.supported);

  const renderTabPanel = (tabIndex: number) => {
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
        <TabsWrapper
          renderTabPanel={renderTabPanel}
          tabsLabel={[
            <FormattedMessage id="cause.about.title" key="cause.about.title" />,
            <FormattedMessage id="cause.events.title" key="cause.events.title" />,
            <FormattedMessage id="cause.discussions.title" key="cause.discussions.title" />,
          ]}
        />
      </Container>
      {!isPreview ? <CreateCauseCTA displayLinkToCauseList /> : null}
      <HeaderButtons cause={cause} onSupport={onSupport} isSupporting={isSupporting} isMobile />
    </>
  );
};

export default CauseDetails;
