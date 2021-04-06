import React, { FunctionComponent } from 'react';
import {
  Container,
  Title,
  SubContainer,
  StepContainer,
  StepNumber,
  StepText,
} from './CreationSteps.style';
import { FormattedMessage, useIntl } from 'react-intl';
import { CHARTER_OF_VALUES_URL } from 'routes';

const CREATION_STEPS_TRANSLATION_KEYS = [
  {
    translationKey: 'our_mission.creation-step-one',
    translationValues: {
      charterOfValues: (
        <a href={CHARTER_OF_VALUES_URL} target="_blank" rel="noopener noreferrer">
          <FormattedMessage id="our_mission.charter-of-values" />
        </a>
      ),
    },
  },
  { translationKey: 'our_mission.creation-step-two' },
  { translationKey: 'our_mission.creation-step-three' },
  { translationKey: 'our_mission.creation-step-four' },
];

const CreationSteps: FunctionComponent = () => {
  const intl = useIntl();

  const renderCreationStep = (
    { translationKey, translationValues }: { translationKey: string; translationValues?: any },
    index: number,
  ) => (
    <StepContainer>
      <StepNumber>{`${index + 1}.`}</StepNumber>
      <StepText>{intl.formatMessage({ id: translationKey }, translationValues)}</StepText>
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
