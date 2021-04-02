import React, { FunctionComponent } from 'react';
import { Container } from './SuccessStories.style';
import SuccessStoryCard from './components/SuccessStoryCard';

const SuccessStories: FunctionComponent<{}> = () => (
  <Container>
    <SuccessStoryCard />
  </Container>
);

export default SuccessStories;
