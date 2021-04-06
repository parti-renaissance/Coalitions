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

const SuccessStoryCard: FunctionComponent<SuccessStory> = ({
  coalition,
  description,
  author,
  imageSrc,
}) => (
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

export default SuccessStoryCard;
