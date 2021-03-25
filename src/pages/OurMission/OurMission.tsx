import React, { FunctionComponent } from 'react';
import OurMissionHeader from 'components/OurMission';
import { CauseDefinition } from 'components/Definition/CauseDefinition';
import CreationSteps from './components/CreationSteps';
import { Container } from './OurMission.style';

const OurMission: FunctionComponent = () => (
  <Container>
    <OurMissionHeader />
    <CauseDefinition />
    <CreationSteps />
  </Container>
);

export default OurMission;
