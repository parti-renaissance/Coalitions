import React, { FunctionComponent } from 'react';
import {
  Container,
  SubContainer,
  HeaderContainer,
  CauseImage,
  DesktopHeaderWrapper,
  MobileHeaderWrapper,
  DesktopQuickActionsWrapper,
} from './CauseDetails.style';
import { FormattedMessage, useIntl } from 'react-intl';
import { InCreationCause, Cause } from 'redux/Cause/types';
import { CreateCauseCTA } from 'pages/CauseList/CreateCauseCTA/CreateCauseCTA';
import { TabsWrapper } from 'components/TabsWrapper/TabsWrapper';
import { Supported } from 'components/Cause/Cause.style';
import AboutThisCause from './components/AboutThisCause';
import Header from './components/Header';
import HeaderButtons from './components/HeaderButtons';
import EmptySection from './components/EmptySection';
import { useCauseOwner } from 'redux/Cause/hooks/useCauseOwner';
import QuickActions from './components/QuickActions';
import { getIsDesktop } from 'services/mobile/mobile';
import { useDispatch } from 'react-redux';
import { updateSnackbar } from 'redux/Snackbar';
import { Severity } from 'redux/Snackbar/types';

interface CauseDetailsProps {
  cause: Cause | InCreationCause;
  onSupport?: () => void;
  isSupporting?: boolean;
}

const CauseDetails: FunctionComponent<CauseDetailsProps> = ({ cause, onSupport, isSupporting }) => {
  // To fix with a global type definition, once behaviour is validated
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav: any = navigator;
  const isAbleToUseShareApi = nav?.share !== undefined;
  const isPreview = Boolean(!onSupport);
  const isSupported = Boolean(cause.supported);
  const isCauseOwner = useCauseOwner(cause);
  const isDesktop = getIsDesktop();
  const intl = useIntl();
  const dispatch = useDispatch();

  const share = () => {
    if (isAbleToUseShareApi && !isDesktop) {
      nav.share({ url: window.location.href, title: cause.name, text: cause.name });
    } else {
      navigator.clipboard.writeText(window.location.href);
      dispatch(
        updateSnackbar({
          message: intl.formatMessage({ id: 'cause.copy-to-clipboard' }),
          severity: Severity.success,
        }),
      );
    }
  };

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
    <Header cause={cause} onSupport={onSupport} isSupporting={isSupporting} share={share} />
  );

  const showQuickActions = !isPreview && (isCauseOwner || isSupported);
  return (
    <>
      <DesktopHeaderWrapper>{renderHeader()}</DesktopHeaderWrapper>
      <Container>
        <SubContainer center={!showQuickActions}>
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
        </SubContainer>
        {showQuickActions && (
          <DesktopQuickActionsWrapper>
            <QuickActions causeId={(cause as Cause).uuid} />
          </DesktopQuickActionsWrapper>
        )}
      </Container>
      {!isPreview ? <CreateCauseCTA displayLinkToCauseList /> : null}
      <HeaderButtons
        cause={cause}
        onSupport={onSupport}
        isSupporting={isSupporting}
        share={share}
        isMobile
      />
    </>
  );
};

export default CauseDetails;
