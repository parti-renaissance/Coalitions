import { coalitionApiClient } from 'services/networking/client';
import { useDispatch } from 'react-redux';
import { markCausesAsSupported, resetCauses, updateCauses, updateOneCause } from '../slice';
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

const doFetchCauses = async ({
  page,
  coalitionsFilter,
  pageSize,
}: {
  page: number;
  coalitionsFilter: string;
  pageSize: number;
}) => {
  return await coalitionApiClient.get(
    `causes?page_size=${pageSize}&page=${page}${coalitionsFilter}`,
  );
};

export const useFetchCauses = (pageSize = PAGE_SIZE) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { doFetchFollowedCauses } = useFetchFollowedCauses();

  const fetch = useCallback(
    async (page: number, filteredByCoalitionIds: string[], isUserLoggedIn: boolean) => {
      setLoading(true);
      try {
        const causes = await doFetchCauses({
          page,
          coalitionsFilter: buildFilteredByUrl(filteredByCoalitionIds),
          pageSize,
        });
        const supportedCauses = await doFetchFollowedCauses({
          uuids: causes.items.map((cause: Cause) => cause.uuid),
          isUserLoggedIn,
        });
        dispatch(
          updateCauses({ causes: causes.items, numberOfCauses: causes.metadata.total_items }),
        );
        dispatch(markCausesAsSupported(supportedCauses));
        setHasMore(causes.metadata.last_page >= page + 1);
        setPage(page + 1);
      } catch (e) {
        HandleErrorService.showErrorSnackbar(e);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, doFetchFollowedCauses, pageSize],
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
    loading,
    fetchFirstPage,
    fetchNextPage,
  };
};

const doFetchCause = async (id: string) => await coalitionApiClient.get(`causes/${id}`);

export const useFetchOneCause = (id: string) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { doFetchFollowedCauses } = useFetchFollowedCauses();

  const fetchCause = useCallback(
    async (isUserLoggedIn = false) => {
      setLoading(true);
      try {
        const cause: Cause = await doFetchCause(id);
        const supportedCauses = await doFetchFollowedCauses({
          uuids: [cause.uuid],
          isUserLoggedIn,
        });
        dispatch(updateOneCause(cause));
        dispatch(markCausesAsSupported(supportedCauses));
      } catch (e) {
        HandleErrorService.showErrorSnackbar(e);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, doFetchFollowedCauses, id],
  );

  return { loading, fetchCause };
};
