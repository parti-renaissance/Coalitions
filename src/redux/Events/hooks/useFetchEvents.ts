import { useCallback, useEffect, useState } from 'react';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { authenticatedApiClient } from 'services/networking/client';
import HandleErrorService from 'services/HandleErrorService';
import useSelector from 'redux/useSelector';
import { isUserLogged } from 'redux/Login/selectors';
import { EventType } from '../types';
import { isUpcomingEvent } from '../helpers/isUpcomingEvent';

export const useFetchEvents = () => {
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const [upcomingEvents, setUpcomingEvents] = useState<EventType[]>([]);
  const [passedEvents, setPassedEvents] = useState<EventType[]>([]);

  const [{ loading: isFetchingEvents, error }, doFetchEvents] = useTypedAsyncFn(
    async () => await authenticatedApiClient.get('v3/events'),
    [],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const fetchEvents = useCallback(async () => {
    if (!isUserLoggedIn) {
      return;
    }

    const eventsResponse = await doFetchEvents();

    if (eventsResponse instanceof Error) {
      return;
    }

    let newUpcomingEvents: EventType[] = [];
    let newPassedEvents: EventType[] = [];

    (eventsResponse.items as EventType[]).forEach(event => {
      if (isUpcomingEvent(event)) {
        newUpcomingEvents = [...newUpcomingEvents, event];
      } else {
        newPassedEvents = [...newPassedEvents, event];
      }
    });

    setUpcomingEvents(newUpcomingEvents);
    setPassedEvents(newPassedEvents);
  }, [doFetchEvents, isUserLoggedIn]);

  return { upcomingEvents, passedEvents, fetchEvents, isFetchingEvents };
};
