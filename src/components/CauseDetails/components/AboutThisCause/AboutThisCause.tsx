import { SeeMore } from 'components/SeeMore/SeeMore';
import React, { FunctionComponent } from 'react';
import { InCreationCause, Cause } from 'redux/Cause/types';
import EmptySection from '../EmptySection';

interface AboutThisCauseProps {
  cause: InCreationCause | Cause;
}

const AboutThisCause: FunctionComponent<AboutThisCauseProps> = ({ cause }) => {
  if (cause.description === undefined || cause.description.length === 0) {
    return (
      <EmptySection
        labelKey="cause.empty-description"
        imageSrc="/images/descriptionPlaceholder.svg"
      />
    );
  }

  return <SeeMore text={cause.description} />;
};

export default AboutThisCause;
