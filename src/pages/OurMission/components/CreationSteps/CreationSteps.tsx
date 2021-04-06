import React, { FunctionComponent } from 'react';
import {
  Container,
  Title,
  SubContainer,
  StepContainer,
  StepNumber,
  StepText,
} from './CreationSteps.style';
import { useIntl } from 'react-intl';

const CREATION_STEPS_TRANSLATION_KEYS = [
  'our_mission.creation-step-one',
  'our_mission.creation-step-two',
  'our_mission.creation-step-three',
  'our_mission.creation-step-four',
];

const CreationSteps: FunctionComponent = () => {
  const intl = useIntl();

  const renderCreationStep = (translationKey: string, index: number) => (
    <StepContainer>
      <StepNumber>{`${index + 1}.`}</StepNumber>
      <StepText>{intl.formatMessage({ id: translationKey })}</StepText>
    </StepContainer>
  );

  return (
    <Container>
      <Title>{intl.formatMessage({ id: 'our_mission.creation-steps-title' })}</Title>
      <SubContainer>{CREATION_STEPS_TRANSLATION_KEYS.map(renderCreationStep)}</SubContainer>
    </Container>
  );
};

export default CreationSteps;
