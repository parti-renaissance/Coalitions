import { useCallback, useEffect, useState } from 'react';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { coalitionApiClient } from 'services/networking/client';
import HandleErrorService from 'services/HandleErrorService';
import { EventType } from '../types';
import { isUpcomingEvent } from '../helpers/isUpcomingEvent';

export const useFetchEvents = ({
  coalitionId,
  causeId,
}: {
  coalitionId?: string;
  causeId?: string;
}) => {
  const [upcomingEvents, setUpcomingEvents] = useState<EventType[]>([]);
  const [passedEvents, setPassedEvents] = useState<EventType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [{ loading: isFetchingEvents, error }, doFetchEvents] = useTypedAsyncFn(
    async (page: number) => {
      const baseUrl = coalitionId !== undefined ? 'coalitions' : 'causes';
      const id = coalitionId !== undefined ? coalitionId : (causeId as string);
      return await coalitionApiClient.get(`${baseUrl}/${id}/events?page=${page}`);
    },
    [],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const fetchEvents = useCallback(async () => {
    if (!hasMore || (coalitionId === undefined && causeId === undefined)) {
      return;
    }

    const eventsResponse = await doFetchEvents(page);

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
    setHasMore(eventsResponse.metadata.last_page >= page + 1);
    setPage(page + 1);
  }, [doFetchEvents, hasMore, coalitionId, causeId, page]);

  return { upcomingEvents, passedEvents, fetchEvents, isFetchingEvents };
};
