import React, { FunctionComponent } from 'react';
import OurMissionHeader from 'components/OurMission';
import { CauseDefinition } from 'components/Definition/CauseDefinition';
import CreationSteps from './components/CreationSteps';
import FixedBottomButton from 'components/FixedBottomButton';
import { PATHS } from 'routes';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';
import { VideoWrapper } from './OurMission.style';
import Video from 'components/Video';

const OurMission: FunctionComponent = () => {
  const history = useHistory();

  const onCreateCauseClick = () => {
    history.push(PATHS.CREATE_CAUSE.url());
  };

  return (
    <>
      <OurMissionHeader />
      <VideoWrapper>
        <Video videoId="KD6egRRsZ_Q" />
      </VideoWrapper>
      <CauseDefinition />
      <CreationSteps />
      <FixedBottomButton onClick={onCreateCauseClick}>
        <FormattedMessage id="cause-cta.cause-creation" />
      </FixedBottomButton>
    </>
  );
};

export default OurMission;
