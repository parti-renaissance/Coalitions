import React, { FunctionComponent } from 'react';
import {
  Container,
  Image,
  SubContainer,
  Coalition,
  Description,
  ByAuthor,
  Commitment,
  Bold,
} from './SuccessStoryCard.style';
import { SuccessStory } from '../../data';
import { FormattedMessage } from 'react-intl';

const SuccessStoryCard: FunctionComponent<SuccessStory> = ({
  coalition,
  description,
  author,
  imageSrc,
  commitment,
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
      <Commitment>{commitment}</Commitment>
    </SubContainer>
  </Container>
);

export default SuccessStoryCard;
