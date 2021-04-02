import React, { FunctionComponent } from 'react';
import { Container, SubContainer, SuccessStoryCardWrapper, Title } from './SuccessStories.style';
import SuccessStoryCard from './components/SuccessStoryCard';
import { SUCCESS_STORIES } from './data';
import { FormattedMessage } from 'react-intl';

const SuccessStories: FunctionComponent<{}> = () => (
  <Container>
    <Title>
      <FormattedMessage id="success_stories.title" />
    </Title>
    <SubContainer>
      {SUCCESS_STORIES.map((successStory, index) => (
        <SuccessStoryCardWrapper key={successStory.title} isFirst={index === 0} show={index <= 1}>
          <SuccessStoryCard {...successStory} />
        </SuccessStoryCardWrapper>
      ))}
    </SubContainer>
  </Container>
);

export default SuccessStories;
