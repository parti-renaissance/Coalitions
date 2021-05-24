import { useCallback, useEffect, useState } from 'react';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { coalitionApiClient } from 'services/networking/client';
import HandleErrorService from 'services/HandleErrorService';
import { EventType } from '../types';
import { useDispatch } from 'react-redux';
import { resetEvents, updateEvents } from '../slice';

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

    if (page === 1) {
      dispatch(resetEvents());
    }

    const eventsResponse = await doFetchEvents(page);

    if (eventsResponse instanceof Error) {
      return;
    }

    const events = (eventsResponse.items as EventType[]).map(
      ({ participants_count, ...restOfEvent }) => ({
        ...restOfEvent,
        causeId: '3165e54b-aab9-40e4-90cf-2de59ac591ca',
        participants_count: typeof participants_count === 'number' ? participants_count : 0,
      }),
    );
    dispatch(updateEvents(events));
    setHasMore(eventsResponse.metadata.last_page >= page + 1);
    setPage(page + 1);
  }, [doFetchEvents, hasMore, coalitionId, causeId, page, dispatch]);

  return { fetchEvents, isFetchingEvents };
};
