import { coalitionApiClient } from 'services/networking/client';
import { useDispatch } from 'react-redux';
import { markCausesAsSupported, resetCauses, updateCauses, updateOneCause } from '../slice';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { useCallback, useState } from 'react';
import { Cause } from '../types';
import { useFetchFollowedCauses } from './useFetchFollowedCauses';
import HandleErrorService from 'services/HandleErrorService';

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

  const { loading: loadingFollowed, doFetchFollowedCauses } = useFetchFollowedCauses();

  const fetch = useCallback(
    async (page: number, filteredByCoalitionIds: string[], isUserLoggedIn: boolean) => {
      const causes = await doFetchCauses({
        page,
        coalitionsFilter: buildFilteredByUrl(filteredByCoalitionIds),
      });

      if (causes instanceof Error) {
        HandleErrorService.showErrorSnackbar(causes);
      }

      const supportedCauses = await doFetchFollowedCauses({
        uuids: causes.items.map((cause: Cause) => cause.uuid),
        isUserLoggedIn,
      });
      dispatch(updateCauses({ causes: causes.items, numberOfCauses: causes.metadata.total_items }));
      dispatch(markCausesAsSupported(supportedCauses));
      setHasMore(causes.metadata.last_page >= page + 1);
      setPage(page + 1);
    },
    [dispatch, doFetchCauses, doFetchFollowedCauses],
  );

  const fetchFirstPage = useCallback(
    async (filteredByCoalitionIds: string[], isUserLoggedIn = false) => {
      dispatch(resetCauses());
      await fetch(1, filteredByCoalitionIds, isUserLoggedIn);
    },
    [dispatch, fetch],
  );

  const fetchNextPage = useCallback(
    async (filteredByCoalitionIds: string[], isUserLoggedIn = false) => {
      if (!hasMore) return;

      await fetch(page, filteredByCoalitionIds, isUserLoggedIn);
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

  const { loading: loadingFollowed, doFetchFollowedCauses } = useFetchFollowedCauses();

  const fetchCause = useCallback(
    async (isUserLoggedIn = false) => {
      const cause: Cause = await doFetchCause();

      if (cause instanceof Error) {
        HandleErrorService.showErrorSnackbar(cause);
      }

      const supportedCauses = await doFetchFollowedCauses({ uuids: [cause.uuid], isUserLoggedIn });
      dispatch(updateOneCause(cause));
      dispatch(markCausesAsSupported(supportedCauses));
    },
    [dispatch, doFetchCause, doFetchFollowedCauses],
  );

  return { loading: loading || loadingFollowed, error, fetchCause };
};
