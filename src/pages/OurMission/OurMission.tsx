import React, { FunctionComponent } from 'react';
import OurMissionHeader from 'components/OurMission';
import CauseDefinition from 'components/CauseDefinition';
import CreationSteps from './components/CreationSteps';
import { Container, CauseDefinitionWrapper } from './OurMission.style';

const OurMission: FunctionComponent = () => (
  <Container>
    <OurMissionHeader />
    <CauseDefinitionWrapper>
      <CauseDefinition />
    </CauseDefinitionWrapper>
    <CreationSteps />
  </Container>
);

export default OurMission;
