import { coalitionApiClient } from 'services/networking/client';
import { useDispatch } from 'react-redux';
import { markCausesAsSupported, resetCauses, updateCauses, updateOneCause } from '../slice';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { useCallback, useState, useEffect } from 'react';
import { Cause } from '../types';
import { useFetchFollowedCauses } from './useFetchFollowedCauses';
import HandleErrorService from 'services/HandleErrorService';
import { useSelector } from 'react-redux';
import { isUserLogged } from 'redux/Login';

type RawQuickActions = {
  id: string;
  title: string;
  url: string;
};

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

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const { loading: loadingFollowed, doFetchFollowedCauses } = useFetchFollowedCauses();

  const fetch = useCallback(
    async (page: number, filteredByCoalitionIds: string[], isUserLoggedIn: boolean) => {
      const causes = await doFetchCauses({
        page,
        coalitionsFilter: buildFilteredByUrl(filteredByCoalitionIds),
      });

      if (causes instanceof Error) {
        return;
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
    fetchFirstPage,
    fetchNextPage,
  };
};

export const useFetchOneCause = (id: string | null) => {
  const dispatch = useDispatch();
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));

  const [{ loading, error }, doFetchCause] = useTypedAsyncFn(async () => {
    if (id === null) {
      return;
    }
    return await coalitionApiClient.get(`causes/${id}`);
  }, []);

  const [
    { loading: isFetchingQuickActions, error: errorFetchingQuickActions },
    doFetchQuickActions,
  ] = useTypedAsyncFn(async () => {
    return await coalitionApiClient.get(`causes/${id}/quick_actions`);
  }, []);

  useEffect(() => {
    if (error !== undefined || errorFetchingQuickActions !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error, errorFetchingQuickActions]);

  const { loading: loadingFollowed, doFetchFollowedCauses } = useFetchFollowedCauses();

  const fetchCause = useCallback(
    async (withQuickActions: boolean = false) => {
      let cause: Cause | undefined = await doFetchCause();

      if (cause === undefined || cause instanceof Error) {
        return;
      }

      const supportedCauses = await doFetchFollowedCauses({
        uuids: [cause.uuid],
        isUserLoggedIn,
      });

      if (withQuickActions) {
        const rawQuickActions: RawQuickActions[] = await doFetchQuickActions();

        if (rawQuickActions instanceof Error) {
          return;
        }

        cause = {
          ...cause,
          quickActions: rawQuickActions.map(({ id, title, url }) => ({
            id,
            label: title,
            link: url,
          })),
        };
      }

      dispatch(updateOneCause(cause));
      dispatch(markCausesAsSupported(supportedCauses));
    },
    [dispatch, doFetchCause, doFetchFollowedCauses, doFetchQuickActions, isUserLoggedIn],
  );

  return { loading: loading || loadingFollowed || isFetchingQuickActions, fetchCause };
};
