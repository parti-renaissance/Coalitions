import React, { FunctionComponent } from 'react';
import OurMissionHeader from 'components/OurMission';
import CauseDefinition from 'components/CauseDefinition';
import {
  Container,
  CauseDefinitionWrapper,
  CreationStepsContainer,
  CreationStepsTitle,
  CreationStepsSubContainer,
  CreationStepContainer,
  CreationStepNumber,
  CreationStepText,
} from './OurMission.style';
import { useIntl } from 'react-intl';

const CREATION_STEPS_TRANSLATION_KEYS = [
  'our_mission.creation-step-one',
  'our_mission.creation-step-two',
  'our_mission.creation-step-three',
];

const OurMission: FunctionComponent = () => {
  const intl = useIntl();

  const renderCreationStep = (translationKey: string, index: number) => (
    <CreationStepContainer>
      <CreationStepNumber>{`${index + 1}.`}</CreationStepNumber>
      <CreationStepText>{intl.formatMessage({ id: translationKey })}</CreationStepText>
    </CreationStepContainer>
  );

  return (
    <Container>
      <OurMissionHeader />
      <CauseDefinitionWrapper>
        <CauseDefinition />
      </CauseDefinitionWrapper>
      <CreationStepsContainer>
        <CreationStepsTitle>
          {intl.formatMessage({ id: 'our_mission.creation-steps-title' })}
        </CreationStepsTitle>
        <CreationStepsSubContainer>
          {CREATION_STEPS_TRANSLATION_KEYS.map(renderCreationStep)}
        </CreationStepsSubContainer>
      </CreationStepsContainer>
    </Container>
  );
};

export default OurMission;
