import React, { FunctionComponent } from 'react';
import { Container, Image, SubContainer } from './SuccessStoryCard.style';

const SuccessStoryCard: FunctionComponent<{}> = () => (
  <Container>
    <Image src="/images/descriptionPlaceholder.svg" />
    <SubContainer>coucou</SubContainer>
  </Container>
);

export default SuccessStoryCard;
