import * as React from 'react';
import { isUserLogged } from '../../redux/Login';
import useSelector from '../../redux/useSelector';
import {
  Wrapper,
  WrapperWithHorizontalMargin,
  TopPartContainer,
  Title,
  Content,
  CoalitionCardsWrapper,
  MobileVideoWrapper,
  DesktopVideoWrapper,
  CreateCauseButtonWrapper,
  Bold,
  CardListWrapper,
} from './Home.style';
import { CauseDefinition } from 'components/Definition/CauseDefinition';
import { CoalitionDefinition } from 'components/Definition/CoalitionDefinition';
import { DefaultLink } from 'components/Link/Link';
import { FormattedMessage } from 'react-intl';
import { PATHS } from 'routes';
import { MediumLargeButton } from 'components/Button/Button';
import CoalitionCards from 'components/CoalitionCards';
import { Coalition } from 'redux/Coalition/types';
import CreateCauseCTA from 'components/CreateCauseCTA';
import { useHistory } from 'react-router';
import Video from 'components/Video';
import OurCommitments from 'components/OurCommitments';
import SuccessModal from './components/SuccessModal';
import SuccessStories from 'components/SuccessStories';
import { useFeatureToggling } from 'services/useFeatureToggling';
import HorizontalCausesList from 'components/HorizontalCausesList';
import { getIsMobile } from 'services/mobile/mobile';
import EventCardsSlider from 'components/EventCardsSlider';

export const VIDEO_ID = 'KkDsxQLM3Ao';

const Home: React.FunctionComponent = () => {
  const history = useHistory();
  const { isCoalitionPageEnable, areEventsEnable } = useFeatureToggling();
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));

  const isMobile = getIsMobile();

  const onCoalitionClick = (coalition: Coalition) => {
    if (isCoalitionPageEnable) {
      history.push(PATHS.COALITION.url(coalition.uuid));
    } else {
      history.push({ pathname: PATHS.CAUSE_LIST.url(), search: `?coalitionId=${coalition.uuid}` });
    }
  };

  const renderVideo = () => <Video videoId={VIDEO_ID} />;

  return (
    <>
      <TopPartContainer>
        <div>
          <Title>
            <FormattedMessage id="home.title" />
          </Title>
          {isMobile ? <MobileVideoWrapper>{renderVideo()}</MobileVideoWrapper> : null}
          <Content>
            <p>
              <FormattedMessage id="home.explanation" />
            </p>
            <br />
            <p>
              <Bold>
                <FormattedMessage id="home.explanation-part-2" />
              </Bold>{' '}
              <FormattedMessage id="home.explanation-part-3" />
            </p>
          </Content>
          <CreateCauseButtonWrapper>
            <DefaultLink to={PATHS.OUR_MISSION.url()}>
              <MediumLargeButton size="small" variant="contained" color="primary">
                <FormattedMessage id="cause-cta.cause-creation" />
              </MediumLargeButton>
            </DefaultLink>
          </CreateCauseButtonWrapper>
        </div>
        {!isMobile ? <DesktopVideoWrapper>{renderVideo()}</DesktopVideoWrapper> : null}
      </TopPartContainer>
      <CauseDefinition />

      {isUserLoggedIn && (
        <CardListWrapper>
          <HorizontalCausesList onlyMine={true} />
        </CardListWrapper>
      )}

      <CardListWrapper>
        <HorizontalCausesList />
      </CardListWrapper>

      {areEventsEnable ? (
        <CardListWrapper>
          <EventCardsSlider filters={{ groupSource: 'coalitions', inFuture: true }} />
        </CardListWrapper>
      ) : null}
      <WrapperWithHorizontalMargin>
        <OurCommitments />
      </WrapperWithHorizontalMargin>
      <CardListWrapper>
        <SuccessStories />
      </CardListWrapper>
      <Wrapper>
        <CoalitionDefinition />
      </Wrapper>
      <WrapperWithHorizontalMargin>
        <h3 id="coalitions">
          <FormattedMessage id="coalition.title" />
        </h3>
        <CoalitionCardsWrapper>
          <CoalitionCards onCoalitionClick={onCoalitionClick} />
        </CoalitionCardsWrapper>
      </WrapperWithHorizontalMargin>
      <Wrapper>
        <CreateCauseCTA displayLinkToCauseList />
      </Wrapper>
      <SuccessModal />
    </>
  );
};

export default Home;
