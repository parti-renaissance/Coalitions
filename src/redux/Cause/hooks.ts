import { coalitionApiClient, authenticatedApiClient } from 'services/networking/client';
import { useDispatch } from 'react-redux';
import {
  markCausesAsSupported,
  optimisticallyMarkCauseAsSupported,
  resetCauses,
  updateCauses,
  updateOneCause,
} from './slice';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { useCallback, useState } from 'react';
import { Cause } from './types';

const PAGE_SIZE = 12;

const buildFilteredByUrl = (ids: string[]) => {
  if (ids.length === 0) {
    return '';
  }
  return ids.reduce((url, id) => {
    return url + `&coalition.uuid[]=${id}`;
  }, '');
};

export const useFetchCauses = (pageSize = PAGE_SIZE) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  const [{ loading: loadingFetch, error }, doFetchCauses] = useTypedAsyncFn(
    async ({ page, coalitionsFilter }: { page: number; coalitionsFilter: string }) =>
      await coalitionApiClient.get(`causes?page_size=${pageSize}&page=${page}${coalitionsFilter}`),
    [],
  );

  const [{ loading: loadingFollowed }, doFetchFollowedCauses] = useTypedAsyncFn(
    async (uuids: string[]) => await authenticatedApiClient.post('v3/causes/followed', { uuids }),
    [],
  );

  const fetch = useCallback(
    async (page: number, filteredByCoalitionIds: string[]) => {
      const causes = await doFetchCauses({
        page,
        coalitionsFilter: buildFilteredByUrl(filteredByCoalitionIds),
      });
      const supportedCauses = await doFetchFollowedCauses(
        causes.items.map((cause: Cause) => cause.uuid),
      );
      dispatch(updateCauses({ causes: causes.items, numberOfCauses: causes.metadata.total_items }));
      dispatch(markCausesAsSupported(supportedCauses));
      setHasMore(causes.metadata.last_page >= page + 1);
      setPage(page + 1);
    },
    [dispatch, doFetchCauses, doFetchFollowedCauses],
  );

  const fetchFirstPage = useCallback(
    async (filteredByCoalitionIds: string[]) => {
      dispatch(resetCauses());
      await fetch(1, filteredByCoalitionIds);
    },
    [dispatch, fetch],
  );

  const fetchNextPage = useCallback(
    async (filteredByCoalitionIds: string[]) => {
      if (!hasMore) return;

      await fetch(page, filteredByCoalitionIds);
    },
    [hasMore, fetch, page],
  );

  return {
    hasMore,
    loading: loadingFetch || loadingFollowed,
    error,
    fetchFirstPage,
    fetchNextPage,
  };
};

export const useFetchOneCause = (id: string) => {
  const dispatch = useDispatch();

  const [{ loading, error }, doFetchCause] = useTypedAsyncFn(
    async () => await coalitionApiClient.get(`causes/${id}`),
    [],
  );

  const [{ loading: loadingFollowed }, doFetchFollowedCauses] = useTypedAsyncFn(
    async (uuids: string[]) => await authenticatedApiClient.post('v3/causes/followed', { uuids }),
    [],
  );

  const fetchCause = useCallback(async () => {
    const cause: Cause = await doFetchCause();
    const supportedCauses = await doFetchFollowedCauses([cause.uuid]);
    dispatch(updateOneCause(cause));
    dispatch(markCausesAsSupported(supportedCauses));
  }, [dispatch, doFetchCause, doFetchFollowedCauses]);

  return { loading: loading || loadingFollowed, error, fetchCause };
};

export const useCauseFollow = (id: string) => {
  const dispatch = useDispatch();

  const [{ loading, error }, doFollowCause] = useTypedAsyncFn(
    async () => await authenticatedApiClient.put(`v3/causes/${id}/follower`, null),
    [],
  );

  const followCause = useCallback(async () => {
    const response = await doFollowCause();
    if (response.uuid !== undefined) {
      dispatch(optimisticallyMarkCauseAsSupported(id));
    }
  }, [dispatch, doFollowCause, id]);

  return { loading, error, followCause };
};
