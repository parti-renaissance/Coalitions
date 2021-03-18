import { SeeMore } from 'components/SeeMore/SeeMore';
import React, { FunctionComponent } from 'react';
import { InCreationCause, Cause } from 'redux/Cause/types';
import { Container, Description } from './AboutThisCause.style';

interface AboutThisCauseProps {
  cause: InCreationCause | Cause;
}

const AboutThisCause: FunctionComponent<AboutThisCauseProps> = ({ cause }) => (
  <Container>
    <Description>
      <SeeMore text={cause.description} />
    </Description>
  </Container>
);

export default AboutThisCause;
