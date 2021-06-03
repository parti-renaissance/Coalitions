import { useCallback, useEffect, useState } from 'react';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { coalitionApiClient } from 'services/networking/client';
import HandleErrorService from 'services/HandleErrorService';
import { RawEventType } from '../types';
import { useDispatch } from 'react-redux';
import { resetEvents, updateEvents, markEventsAsParticipate } from '../slice';
import { adaptEvent } from '../helpers/adapter';
import { useFetchUserParticipateEvents } from './useFetchUserParticipateEvents';

export type GroupSource = 'en_marche' | 'coalitions';

export const useFetchEvents = ({
  coalitionId,
  causeId,
  groupSource,
}: {
  coalitionId?: string;
  causeId?: string;
  groupSource?: GroupSource;
}) => {
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
      if (coalitionId === undefined && causeId === undefined) {
        baseUrl = 'events?';
      } else {
        if (coalitionId !== undefined) {
          baseUrl = `coalitions/${coalitionId}`;
        } else {
          baseUrl = `causes/${causeId}`;
        }
        baseUrl = `${baseUrl}/events?`;
      }

      if (groupSource !== undefined) {
        baseUrl = `${baseUrl}group_source=${groupSource}`;
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
