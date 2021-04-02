import React, { FunctionComponent } from 'react';
import {
  Container,
  Image,
  SubContainer,
  TopTag,
  Title,
  Description,
  ByAuthor,
  Bold,
} from './SuccessStoryCard.style';
import { SuccessStory } from '../../data';

const SuccessStoryCard: FunctionComponent<SuccessStory> = ({
  topTag,
  title,
  description,
  author,
  commitment,
  imageSrc,
}) => (
  <Container>
    <Image src={imageSrc} />
    <SubContainer>
      <TopTag>{topTag}</TopTag>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <ByAuthor>{author}</ByAuthor>
    </SubContainer>
  </Container>
);

export default SuccessStoryCard;
