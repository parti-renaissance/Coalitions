import React, { FunctionComponent } from 'react';
import { Container, SubContainer, SuccessStoryCardWrapper } from './SuccessStories.style';
import SuccessStoryCard from './components/SuccessStoryCard';
import { SUCCESS_STORIES } from './data';

const SuccessStories: FunctionComponent<{}> = () => (
  <Container>
    <SubContainer>
      {SUCCESS_STORIES.map((successStory, index) => (
        <SuccessStoryCardWrapper isFirst={index === 0} show={index <= 1}>
          <SuccessStoryCard key={successStory.title} {...successStory} />
        </SuccessStoryCardWrapper>
      ))}
    </SubContainer>
  </Container>
);

export default SuccessStories;
