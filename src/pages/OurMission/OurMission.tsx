import React, { FunctionComponent } from 'react';
import OurMissionHeader from 'components/OurMission';
import CauseDefinition from 'components/CauseDefinition';
import { CauseDefinitionWrapper } from './OurMission.style';

const OurMission: FunctionComponent = () => {
  return (
    <>
      <OurMissionHeader />
      <CauseDefinitionWrapper>
        <CauseDefinition />
      </CauseDefinitionWrapper>
    </>
  );
};

export default OurMission;
