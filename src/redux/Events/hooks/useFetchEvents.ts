import { useCallback, useEffect, useState } from 'react';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { coalitionApiClient } from 'services/networking/client';
import HandleErrorService from 'services/HandleErrorService';
import { RawEventType } from '../types';
import { useDispatch } from 'react-redux';
import { resetEvents, updateEvents, markEventsAsParticipate } from '../slice';
import { adaptEvent } from '../helpers/adapter';
import { useFetchUserParticipateEvents } from './useFetchUserParticipateEvents';
import { format } from 'date-fns';

export type GroupSource = 'en_marche' | 'coalitions';

export const useFetchEvents = (
  filters:
    | {
        coalitionId?: string;
        causeId?: string;
        groupSource?: GroupSource;
        inFuture?: boolean;
      }
    | undefined,
) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  const {
    loading: isFetchingUserParticipateEvents,
    doFetchUserParticipateEvents,
  } = useFetchUserParticipateEvents();

  const [{ loading: isFetchingEvents, error }, doFetchEvents] = useTypedAsyncFn(
    async (page: number) => {
      let baseUrl = '';
      if (
        filters === undefined ||
        (filters.coalitionId === undefined && filters.causeId === undefined)
      ) {
        baseUrl = 'events?';
      } else {
        if (filters.coalitionId !== undefined) {
          baseUrl = `coalitions/${filters.coalitionId}`;
        } else {
          baseUrl = `causes/${filters.causeId}`;
        }
        baseUrl = `${baseUrl}/events?`;
      }

      if (filters !== undefined && filters.groupSource !== undefined) {
        baseUrl = `${baseUrl}&group_source=${filters.groupSource}`;
      }

      if (filters !== undefined && filters.inFuture === true) {
        baseUrl = `${baseUrl}&finishAt[strictly_after]=${format(new Date(), 'yyyy-MM-dd')}`;
      }

      return await coalitionApiClient.get(`${baseUrl}&page=${page}&page_size=30`);
    },
    [],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const fetchEvents = useCallback(async () => {
    if (!hasMore) {
      return;
    }

    if (page === 1) {
      dispatch(resetEvents());
    }

    const eventsResponse = await doFetchEvents(page);

    if (eventsResponse instanceof Error) {
      return;
    }

    const events = (eventsResponse.items as RawEventType[]).map(adaptEvent);
    const userParticipateEvents = await doFetchUserParticipateEvents(
      events.map(({ uuid }) => uuid),
    );
    dispatch(updateEvents(events));
    dispatch(markEventsAsParticipate(userParticipateEvents));
    setHasMore(eventsResponse.metadata.last_page >= page + 1);
    setPage(page + 1);
  }, [doFetchEvents, hasMore, page, dispatch, doFetchUserParticipateEvents]);

  return { fetchEvents, isFetchingEvents: isFetchingEvents || isFetchingUserParticipateEvents };
};
