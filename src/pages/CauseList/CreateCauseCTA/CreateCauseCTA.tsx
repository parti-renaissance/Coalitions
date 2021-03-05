import React from 'react';
import { useSelector } from 'react-redux';
import { getNumberOfCauses } from 'redux/Cause/selectors';
import {
  CTABlock,
  CTAButton,
  CTAContainer,
  DescriptionText,
  HeadSentence,
} from './CreateCauseCTA.style';

export const CreateCauseCTA: React.FunctionComponent = () => {
  const numberOfCauses = useSelector(getNumberOfCauses);

  return (
    <CTAContainer>
      <CTABlock>
        <HeadSentence>Vous aussi, agissez !</HeadSentence>
        <DescriptionText>
          Rejoignez les {numberOfCauses} porteurs de causes déjà mobilisés.
        </DescriptionText>
        <CTAButton variant="contained" color="secondary">
          Je crée ma cause
        </CTAButton>
      </CTABlock>
    </CTAContainer>
  );
};
