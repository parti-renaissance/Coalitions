import { SeeMore } from 'components/SeeMore/SeeMore';
import React, { FunctionComponent } from 'react';
import { InCreationCause } from 'redux/Cause/types';
import { Container, Description } from './AboutThisCause.style';

const AboutThisCause: FunctionComponent<{ cause: InCreationCause }> = ({ cause }) => (
  <Container>
    <Description>
      <SeeMore text={cause.description} />
    </Description>
  </Container>
);

export default AboutThisCause;
