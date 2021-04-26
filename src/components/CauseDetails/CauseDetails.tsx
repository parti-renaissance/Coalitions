import React, { FunctionComponent } from 'react';
import {
  Container,
  SubContainer,
  HeaderContainer,
  CauseImage,
  DesktopHeaderWrapper,
  MobileHeaderWrapper,
  DesktopQuickActionsWrapper,
  AboutThisCauseWrapper,
} from './CauseDetails.style';
import { InCreationCause, Cause } from 'redux/Cause/types';
import { CreateCauseCTA } from 'pages/CauseList/CreateCauseCTA/CreateCauseCTA';
import AboutThisCause from './components/AboutThisCause';
import Header from './components/Header';
import HeaderButtons from './components/HeaderButtons';
import { useCauseOwner } from 'redux/Cause/hooks/useCauseOwner';
import QuickActions from './components/QuickActions';
import FollowTag from 'components/FollowTag/FollowTag';

interface CauseDetailsProps {
  cause: Cause | InCreationCause;
  onSupport?: () => void;
  isSupporting?: boolean;
}

const CauseDetails: FunctionComponent<CauseDetailsProps> = ({ cause, onSupport, isSupporting }) => {
  const isPreview = Boolean(!onSupport);
  const isSupported = Boolean(cause.supported);
  const isCauseOwner = useCauseOwner(cause);

  const renderHeader = () => (
    <Header cause={cause} onSupport={onSupport} isSupporting={isSupporting} />
  );

  const showQuickActions = !isPreview && (isCauseOwner || isSupported);
  return (
    <>
      <DesktopHeaderWrapper>{renderHeader()}</DesktopHeaderWrapper>
      <Container>
        <SubContainer center={!showQuickActions}>
          <HeaderContainer>
            <CauseImage backgroundImage={cause.image_url} />
            {isSupported ? <FollowTag labelKey="cause.supported" /> : null}
            <MobileHeaderWrapper>{renderHeader()}</MobileHeaderWrapper>
          </HeaderContainer>
          <AboutThisCauseWrapper>
            <AboutThisCause cause={cause} />
          </AboutThisCauseWrapper>
        </SubContainer>
        {showQuickActions && (
          <DesktopQuickActionsWrapper>
            <QuickActions causeId={(cause as Cause).uuid} />
          </DesktopQuickActionsWrapper>
        )}
      </Container>
      {!isPreview ? <CreateCauseCTA displayLinkToCauseList /> : null}
      <HeaderButtons cause={cause} onSupport={onSupport} isSupporting={isSupporting} isMobile />
    </>
  );
};

export default CauseDetails;
