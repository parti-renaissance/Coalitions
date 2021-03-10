import { coalitionApiClient } from 'services/networking/client';
import { useDispatch } from 'react-redux';
import { resetCauses, updateCauses, updateOneCause } from './slice';
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

  const [{ loading, error }, doFetchCauses] = useTypedAsyncFn(
    async ({ page, coalitionsFilter }: { page: number; coalitionsFilter: string }) =>
      await coalitionApiClient.get(`causes?page_size=${pageSize}&page=${page}${coalitionsFilter}`),
    [],
  );

  const fetch = useCallback(
    async (page: number, filteredByCoalitionIds: string[]) => {
      const causes = await doFetchCauses({
        page,
        coalitionsFilter: buildFilteredByUrl(filteredByCoalitionIds),
      });
      dispatch(updateCauses({ causes: causes.items, numberOfCauses: causes.metadata.total_items }));
      setHasMore(causes.metadata.last_page >= page + 1);
      setPage(page + 1);
    },
    [dispatch, doFetchCauses],
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

  return { hasMore, loading, error, fetchFirstPage, fetchNextPage };
};

export const useFetchOneCause = (id: string) => {
  const dispatch = useDispatch();

  const [{ loading, error }, doFetchCause] = useTypedAsyncFn(
    async () => await coalitionApiClient.get(`causes/${id}`),
    [],
  );

  const fetchCause = useCallback(async () => {
    const cause: Cause = await doFetchCause();
    dispatch(updateOneCause(cause));
  }, [dispatch, doFetchCause]);

  return { loading, error, fetchCause };
};
