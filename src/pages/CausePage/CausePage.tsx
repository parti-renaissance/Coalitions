import Loader from 'components/Loader';
import React, { useEffect, useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useFetchOneCause } from 'redux/Cause/hooks';
import { getCause } from 'redux/Cause/selectors';
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
} from './CausePage.style';
import { FormattedMessage, useIntl } from 'react-intl';
import { colorPalette } from 'stylesheet';
import { Tabs } from '@material-ui/core';
import AboutThisCause from './components/AboutThisCause';
import AuthorAndSupports from 'components/AuthorAndSupports';
import FixedBottomButton from 'components/FixedBottomButton';
import LoginAndSupportModal from 'components/LoginAndSupportModal';

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

  useEffect(() => {
    fetchCause();
  }, [fetchCause]);

  const onActiveTabIndexChange = (_: ChangeEvent<{}>, value: number) => {
    setActiveTabIndex(value);
  };

  const onSupportClick = () => {
    // TODO check if user is connected
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  const renderTabPanel = () => {
    switch (activeTabIndex) {
      case 0:
        return cause !== undefined ? <AboutThisCause cause={cause} /> : null;
      default:
        return null;
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
          <CausePageSubHeaderContainer>
            <div>
              <CoalitionName>{cause.coalition.name}</CoalitionName>
              <CauseName>{cause.name}</CauseName>
              <AuthorAndSupportsWrapper>
                <AuthorAndSupports cause={cause} showAuthor />
              </AuthorAndSupportsWrapper>
            </div>
            <DesktopSupportButton
              size="small"
              variant="contained"
              color="primary"
              onClick={onSupportClick}
            >
              {intl.formatMessage({ id: 'cause.support-button' })}
            </DesktopSupportButton>
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
      </CausePageContainer>
      <MobileSupportButtonWrapper>
        <FixedBottomButton onClick={onSupportClick}>
          {intl.formatMessage({ id: 'cause.support-button' })}
        </FixedBottomButton>
      </MobileSupportButtonWrapper>
      <LoginAndSupportModal isOpened={isModalOpened} onClose={closeModal} cause={cause} />
    </>
  );
};

export default CausePage;
