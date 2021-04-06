import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
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
}) => {
  const contentContainerRef = useRef<HTMLDivElement | null>(null);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    if (contentContainerRef !== null && contentContainerRef.current !== null) {
      console.log({ hh: contentContainerRef.current.clientHeight });
      setImageHeight(contentContainerRef.current.clientHeight);
    }
  }, [contentContainerRef]);

  return (
    <Container>
      <Image src={imageSrc} height={imageHeight} />
      <SubContainer ref={contentContainerRef}>
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
