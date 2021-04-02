import React, { FunctionComponent } from 'react';
import {
  Container,
  SubContainer,
  SubSubContainer,
  SuccessStoryCardWrapper,
  Title,
  EmptyDiv,
} from './SuccessStories.style';
import SuccessStoryCard from './components/SuccessStoryCard';
import { SUCCESS_STORIES } from './data';
import { FormattedMessage } from 'react-intl';

const SuccessStories: FunctionComponent<{}> = () => (
  <Container>
    <Title>
      <FormattedMessage id="success_stories.title" />
    </Title>
    <SubContainer>
      <SubSubContainer>
        {SUCCESS_STORIES.map((successStory, index) => (
          <SuccessStoryCardWrapper key={successStory.title} isFirst={index === 0} show={index <= 1}>
            <SuccessStoryCard {...successStory} />
          </SuccessStoryCardWrapper>
        ))}
        <EmptyDiv />
      </SubSubContainer>
    </SubContainer>
  </Container>
);

export default SuccessStories;
