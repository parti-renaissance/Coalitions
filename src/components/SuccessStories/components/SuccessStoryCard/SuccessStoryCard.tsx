import React, { FunctionComponent } from 'react';
import {
  Container,
  Image,
  SubContainer,
  Coalition,
  Description,
  ByAuthor,
  Bold,
} from './SuccessStoryCard.style';
import { SuccessStory } from '../../data';
import { FormattedMessage } from 'react-intl';

interface SuccessStoryProps {
  successStory: SuccessStory;
}

const SuccessStoryCard: FunctionComponent<SuccessStoryProps> = ({ successStory }) => {
  const { coalition, description, author, imageSrc } = successStory;

  return (
    <Container>
      <Image src={imageSrc} />
      <SubContainer>
        <Coalition>{coalition}</Coalition>
        <Description>{description}</Description>
        <ByAuthor>
          <FormattedMessage id="success_stories.by" />
          <Bold>{` ${author}`}</Bold>
        </ByAuthor>
      </SubContainer>
    </Container>
  );
};

export default SuccessStoryCard;
