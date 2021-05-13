import { useCallback, useEffect, useState } from 'react';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { authenticatedApiClient } from 'services/networking/client';
import HandleErrorService from 'services/HandleErrorService';
import useSelector from 'redux/useSelector';
import { isUserLogged } from 'redux/Login/selectors';
import { EventType } from '../types';

export const useFetchEvents = () => {
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const [events, setEvents] = useState<EventType[]>([]);

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

    setEvents(eventsResponse.items as EventType[]);
  }, [doFetchEvents, isUserLoggedIn]);

  return { events, fetchEvents, isFetchingEvents };
};
