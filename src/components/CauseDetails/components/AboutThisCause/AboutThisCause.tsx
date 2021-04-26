import { SeeMore } from 'components/SeeMore/SeeMore';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { InCreationCause, Cause } from 'redux/Cause/types';
import { Title } from './AboutThisCause.style';
import EmptySection from '../EmptySection';

interface AboutThisCauseProps {
  cause: InCreationCause | Cause;
}

const AboutThisCause: FunctionComponent<AboutThisCauseProps> = ({ cause }) => {
  const intl = useIntl();

  if (cause.description === undefined || cause.description.length === 0) {
    return (
      <EmptySection
        labelKey="cause.empty-description"
        imageSrc="/images/descriptionPlaceholder.svg"
      />
    );
  }

  return (
    <>
      <Title>{intl.formatMessage({ id: 'cause.about.title' })}</Title>
      <SeeMore text={cause.description} />
    </>
  );
};

export default AboutThisCause;
