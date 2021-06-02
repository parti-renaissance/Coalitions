import { useCallback, useEffect, useState } from 'react';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { coalitionApiClient } from 'services/networking/client';
import HandleErrorService from 'services/HandleErrorService';
import { RawEventType } from '../types';
import { useDispatch } from 'react-redux';
import { resetEvents, updateEvents, markEventsAsParticipate } from '../slice';
import { adaptEvent } from '../helpers/adapter';
import { useFetchUserParticipateEvents } from './useFetchUserParticipateEvents';

export const useFetchEvents = ({
  coalitionId,
  causeId,
}: {
  coalitionId?: string;
  causeId?: string;
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
      const baseUrl = coalitionId !== undefined ? 'coalitions' : 'causes';
      const id = coalitionId !== undefined ? coalitionId : (causeId as string);
      return await coalitionApiClient.get(`${baseUrl}/${id}/events?page=${page}&page_size=30`);
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
  }, [doFetchEvents, hasMore, coalitionId, causeId, page, dispatch, doFetchUserParticipateEvents]);

  return { fetchEvents, isFetchingEvents: isFetchingEvents || isFetchingUserParticipateEvents };
};
