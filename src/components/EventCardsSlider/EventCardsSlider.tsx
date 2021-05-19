import React, { FunctionComponent, useEffect, useState } from 'react';
import { EmptyMobileDiv, EventCardWrapper, TabBarWrapper } from './EventCardsSlider.style';
import { FormattedMessage, useIntl } from 'react-intl';
import { getIsMobile } from 'services/mobile/mobile';
import Slider from 'components/Slider';
import { useFetchEvents } from 'redux/Events/hooks/useFetchEvents';
import {
  DESKTOP_MARGIN_BETWEEN_CARDS,
  DESKTOP_WIDTH,
  HEIGHT,
} from 'components/EventCard/EventCard.style';
import EventCard from 'components/EventCard';
import TabBar from 'components/TabBar';

const TAB_LABEL_KEYS = ['events.upcoming', 'events.passed'];

interface EventCardsSliderProps {
  coalitionId?: string;
  causeId?: string;
  TitleComponent?: FunctionComponent;
}

const EventCardsSlider: FunctionComponent<EventCardsSliderProps> = ({
  coalitionId,
  causeId,
  TitleComponent,
}) => {
  const intl = useIntl();
  const isMobile = getIsMobile();
  const { upcomingEvents, passedEvents, fetchEvents, isFetchingEvents } = useFetchEvents({
    coalitionId,
    causeId,
  });
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (upcomingEvents.length === 0 && passedEvents.length > 0) {
      setSelectedTabIndex(1);
    }
  }, [upcomingEvents, passedEvents, setSelectedTabIndex]);

  const renderTabBar = () => (
    <TabBarWrapper>
      <TabBar
        tabLabels={TAB_LABEL_KEYS.map(key => (
          <FormattedMessage id={key} key={key} />
        ))}
        selectedTabIndex={selectedTabIndex}
        setSelectedTabIndex={setSelectedTabIndex}
      />
    </TabBarWrapper>
  );

  const eventsToDisplay = selectedTabIndex === 0 ? upcomingEvents : passedEvents;

  return (
    <Slider
      slidesCount={eventsToDisplay.length}
      isLoadingSlides={isFetchingEvents}
      TitleComponent={TitleComponent}
      title={intl.formatMessage({ id: 'events.title' })}
      desktopCarouselProps={{
        slideWidth: `${DESKTOP_WIDTH}px`,
        cellSpacing: DESKTOP_MARGIN_BETWEEN_CARDS,
      }}
      slidesHeight={{ mobile: HEIGHT, desktop: HEIGHT }}
      SubTitle={upcomingEvents.length > 0 && passedEvents.length > 0 ? renderTabBar : undefined}
    >
      {eventsToDisplay.map(event => (
        <EventCardWrapper key={event.uuid}>
          <EventCard event={event} />
        </EventCardWrapper>
      ))}
      {isMobile ? <EmptyMobileDiv /> : null}
    </Slider>
  );
};

export default EventCardsSlider;
