import React, { FunctionComponent } from 'react';
import { EmptyMobileDiv, SuccessStoryCardWrapper } from './SuccessStories.style';
import SuccessStoryCard from './components/SuccessStoryCard';
import {
  DESKTOP_HEIGHT,
  MOBILE_HEIGHT,
  DESKTOP_MARGIN_BETWEEN_CARDS,
} from './components/SuccessStoryCard/SuccessStoryCard.style';
import { SUCCESS_STORIES } from './data';
import { useIntl } from 'react-intl';
import { getIsMobile } from 'services/mobile/mobile';
import Slider from 'components/Slider';
import { defaultMarginsAsNumber, TABLET_BREAK_POINT } from 'stylesheet';

const SuccessStories: FunctionComponent<{}> = () => {
  const intl = useIntl();
  const isMobile = getIsMobile();

  return (
    <Slider
      slidesCount={SUCCESS_STORIES.length}
      title={intl.formatMessage({ id: 'success_stories.title' })}
      desktopCarouselProps={{
        slideWidth: `${TABLET_BREAK_POINT -
          2 * defaultMarginsAsNumber.horizontal.desktop -
          DESKTOP_MARGIN_BETWEEN_CARDS}px`,
        cellSpacing: DESKTOP_MARGIN_BETWEEN_CARDS,
      }}
      slidesHeight={{ mobile: MOBILE_HEIGHT, desktop: DESKTOP_HEIGHT }}
    >
      {SUCCESS_STORIES.map(successStory => (
        <SuccessStoryCardWrapper key={successStory.author}>
          <SuccessStoryCard successStory={successStory} />
        </SuccessStoryCardWrapper>
      ))}
      {isMobile ? <EmptyMobileDiv /> : null}
    </Slider>
  );
};

export default SuccessStories;
