import React, { FunctionComponent, useEffect } from 'react';
import { EmptyMobileDiv, EventCardWrapper } from './EventCardsSlider.style';
import { useIntl } from 'react-intl';
import { getIsMobile } from 'services/mobile/mobile';
import Slider from 'components/Slider';
import { useFetchEvents } from 'redux/Events/hooks/useFetchEvents';
import {
  DESKTOP_MARGIN_BETWEEN_CARDS,
  DESKTOP_WIDTH,
  HEIGHT,
} from 'components/EventCard/EventCard.style';
import EventCard from 'components/EventCard';

interface EventCardsSliderProps {}

const EventCardsSlider: FunctionComponent<EventCardsSliderProps> = () => {
  const intl = useIntl();
  const isMobile = getIsMobile();
  const { events, fetchEvents, isFetchingEvents } = useFetchEvents();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <Slider
      slidesCount={events.length}
      isLoadingSlides={isFetchingEvents}
      title={intl.formatMessage({ id: 'events.title' })}
      desktopCarouselProps={{
        slideWidth: `${DESKTOP_WIDTH}px`,
        cellSpacing: DESKTOP_MARGIN_BETWEEN_CARDS,
      }}
      slidesHeight={{ mobile: HEIGHT, desktop: HEIGHT }}
    >
      {events.map(event => (
        <EventCardWrapper key={event.uuid}>
          <EventCard event={event} />
        </EventCardWrapper>
      ))}
      {isMobile ? <EmptyMobileDiv /> : null}
    </Slider>
  );
};

export default EventCardsSlider;
