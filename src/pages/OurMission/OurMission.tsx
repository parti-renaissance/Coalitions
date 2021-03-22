import React, { FunctionComponent } from 'react';
import OurMissionHeader from 'components/OurMission';
import { CauseDefinition } from 'components/Definition/CauseDefinition';
import CreationSteps from './components/CreationSteps';
import { Container } from './OurMission.style';
import { DefinitionWrapper } from 'components/Definition/Definition.style';

const OurMission: FunctionComponent = () => (
  <Container>
    <OurMissionHeader />
    <DefinitionWrapper>
      <CauseDefinition />
    </DefinitionWrapper>
    <CreationSteps />
  </Container>
);

export default OurMission;
