import * as React from 'react';
import {
  Block,
  TopPartContainer,
  Title,
  Content,
  CoalitionCardsWrapper,
  MobileVideoWrapper,
  DesktopVideoWrapper,
  CreateCauseButtonWrapper,
  Bold,
  OurCommitmentsWrapper,
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

export const VIDEO_ID = 'KkDsxQLM3Ao';

const Home: React.FunctionComponent = () => {
  const history = useHistory();
  const { isCoalitionPageEnable } = useFeatureToggling();
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
      <Block>
        <HorizontalCausesList />
      </Block>
      <OurCommitmentsWrapper>
        <OurCommitments />
      </OurCommitmentsWrapper>
      <SuccessStories />
      <CoalitionDefinition />
      <Block>
        <h3 id="coalitions">
          <FormattedMessage id="coalition.title" />
        </h3>
        <CoalitionCardsWrapper>
          <CoalitionCards onCoalitionClick={onCoalitionClick} />
        </CoalitionCardsWrapper>
      </Block>
      <CreateCauseCTA displayLinkToCauseList />
      <SuccessModal />
    </>
  );
};

export default Home;
