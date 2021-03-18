import Loader from 'components/Loader';
import React, { useEffect, useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useFetchOneCause } from 'redux/Cause/hooks/useFetchCauses';
import { getCause } from 'redux/Cause/selectors';
import { getUserToken } from 'redux/Login';
import {
  CausePageContainer,
  CausePageHeader,
  CauseName,
  CoalitionName,
  CauseImage,
  CausePageSubHeaderContainer,
  TabsWrapper,
  StyledTab,
  AuthorAndSupportsWrapper,
  MobileSupportButtonWrapper,
  DesktopSupportButton,
  Supported,
} from './CausePage.style';
import { FormattedMessage, useIntl } from 'react-intl';
import { colorPalette } from 'stylesheet';
import { Tabs } from '@material-ui/core';
import AboutThisCause from './components/AboutThisCause';
import AuthorAndSupports from 'components/AuthorAndSupports';
import FixedBottomButton from 'components/FixedBottomButton';
import LoginAndSupportModal from 'components/LoginAndSupportModal';
import { CreateCauseCTA } from 'pages/CauseList/CreateCauseCTA/CreateCauseCTA';
import { SmallButton } from 'components/Button/Button';
import { useSnackbar } from 'redux/Snackbar/hooks';
import { useCauseFollow } from 'redux/Cause/hooks/useCauseFollow';
import { PATHS } from 'routes';

interface CausePageNavParams {
  causeId: string;
}

const TAB_INDICATOR_PROPS = {
  style: {
    backgroundColor: colorPalette.mintGreen2,
  },
};

const CausePage: React.FunctionComponent = () => {
  const { causeId } = useParams<CausePageNavParams>();
  const { loading, fetchCause } = useFetchOneCause(causeId);
  const cause = useSelector(getCause(causeId));
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const intl = useIntl();
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const { showErrorSnackbar, showSuccessSnackbar, showWarningSnackbar } = useSnackbar();
  const { loading: loadingCauseFollow, followCause } = useCauseFollow(causeId);
  const isUserLoggedIn = Boolean(useSelector(getUserToken));

  useEffect(() => {
    fetchCause();
  }, [fetchCause, isUserLoggedIn]);

  const onActiveTabIndexChange = (_: ChangeEvent<{}>, value: number) => {
    setActiveTabIndex(value);
  };

  const onSupportClick = () => {
    if (isUserLoggedIn) {
      followCause();
    } else {
      setIsModalOpened(true);
    }
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  const renderTabPanel = () => {
    switch (activeTabIndex) {
      case 0:
        return cause !== undefined ? <AboutThisCause cause={cause} /> : null;
      default:
        return (
          <>
            <SmallButton onClick={() => showSuccessSnackbar("Tout s'est bien passé !")}>
              {'SHOW SUCCESS SNACKBAR'}
            </SmallButton>
            <SmallButton onClick={() => showErrorSnackbar('Une erreur est survenue !')}>
              {'SHOW ERROR SNACKBAR'}
            </SmallButton>
            <SmallButton onClick={() => showWarningSnackbar('Attention Attention Attention!')}>
              {'SHOW WARNING SNACKBAR'}
            </SmallButton>
          </>
        );
    }
  };

  if (loading && cause === undefined) {
    return <Loader />;
  }

  if (cause === undefined) {
    return null;
  }

  return (
    <>
      <CausePageContainer>
        <CausePageHeader>
          <CauseImage backgroundImage={cause.image_url} />
          {Boolean(cause.supported) ? (
            <Supported>
              <FormattedMessage id="cause.supported" />
            </Supported>
          ) : null}
          <CausePageSubHeaderContainer>
            <div>
              <CoalitionName>{cause.coalition.name}</CoalitionName>
              <CauseName>{cause.name}</CauseName>
              <AuthorAndSupportsWrapper>
                <AuthorAndSupports cause={cause} showAuthor />
              </AuthorAndSupportsWrapper>
            </div>
            {Boolean(cause.supported) || (
              <DesktopSupportButton
                size="small"
                variant="contained"
                color="primary"
                onClick={onSupportClick}
                isLoading={loadingCauseFollow}
              >
                {intl.formatMessage({ id: 'cause.support-button' })}
              </DesktopSupportButton>
            )}
          </CausePageSubHeaderContainer>
        </CausePageHeader>
        <TabsWrapper>
          <Tabs
            value={activeTabIndex}
            onChange={onActiveTabIndexChange}
            TabIndicatorProps={TAB_INDICATOR_PROPS}
          >
            <StyledTab label={<FormattedMessage id="cause.about.title" />} />
            <StyledTab label={<FormattedMessage id="cause.events.title" />} />
            <StyledTab label={<FormattedMessage id="cause.discussions.title" />} />
          </Tabs>
          {renderTabPanel()}
        </TabsWrapper>
        <CreateCauseCTA displayLinkToCauseList />
      </CausePageContainer>
      {Boolean(cause.supported) || (
        <MobileSupportButtonWrapper>
          <FixedBottomButton onClick={onSupportClick} isLoading={loadingCauseFollow}>
            {intl.formatMessage({ id: 'cause.support-button' })}
          </FixedBottomButton>
        </MobileSupportButtonWrapper>
      )}
      <LoginAndSupportModal
        isOpened={isModalOpened}
        onClose={closeModal}
        cause={cause}
        redirectToAfterAuth={PATHS.CAUSE.url(cause.uuid)}
      />
    </>
  );
};

export default CausePage;
