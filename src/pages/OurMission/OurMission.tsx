import React, { FunctionComponent } from 'react';
import OurMissionHeader from 'components/OurMission';
import CreationSteps from './components/CreationSteps';
import FixedBottomButton from 'components/FixedBottomButton';
import { PATHS } from 'routes';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';
import OurCommitments from 'components/OurCommitments';
import { OurCommitmentsWrapper } from './OurMission.style';
// import Video from 'components/Video';
import SuccessStories from 'components/SuccessStories';

const OurMission: FunctionComponent = () => {
  const history = useHistory();

  const onCreateCauseClick = () => {
    history.push(PATHS.CREATE_CAUSE.url());
  };

  return (
    <>
      <SuccessStories />
      <OurMissionHeader />
      {/* <VideoWrapper>
        <Video videoId="KD6egRRsZ_Q" />
      </VideoWrapper> */}
      <CreationSteps />
      <OurCommitmentsWrapper>
        <OurCommitments />
      </OurCommitmentsWrapper>
      <FixedBottomButton onClick={onCreateCauseClick}>
        <FormattedMessage id="cause-cta.cause-creation" />
      </FixedBottomButton>
    </>
  );
};

export default OurMission;
