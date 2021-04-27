/* eslint-disable max-lines */

import { coalitionApiClient } from 'services/networking/client';
import { useDispatch } from 'react-redux';
import { markCausesAsSupported, resetCauses, updateCauses, updateOneCause } from '../slice';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { useCallback, useState, useEffect } from 'react';
import { Cause } from '../types';
import { useFetchFollowedCauses } from './useFetchFollowedCauses';
import HandleErrorService, { APIErrorsType } from 'services/HandleErrorService';
import { useSelector } from 'react-redux';
import { isUserLogged } from 'redux/Login';
import request from 'superagent';
import { useIntl } from 'react-intl';

type RawQuickActions = {
  id: string;
  title: string;
  url: string;
};

export type Filters = {
  coalitionIds: string[];
  searchText: string;
};

const PAGE_SIZE = 12;

const buildFilteredByUrl = (filters: Filters) => {
  if (filters.coalitionIds.length === 0 && filters.searchText.length === 0) {
    return '';
  }

  let urlWithFilters = '';
  if (filters.coalitionIds.length > 0) {
    urlWithFilters = filters.coalitionIds.reduce((url, coalitionId) => {
      return url + `&coalition.uuid[]=${coalitionId}`;
    }, urlWithFilters);
  }

  if (filters.searchText.length > 0) {
    urlWithFilters = `${urlWithFilters}&name=${filters.searchText}`;
  }

  return urlWithFilters;
};

const useFetchCausesErrorHandler = () => {
  const { formatMessage } = useIntl();

  return useCallback(
    (useFilters: boolean, error?: APIErrorsType) => {
      if (error instanceof Response || error === undefined || error.message === undefined) {
        return null;
      }
      if (useFilters) {
        return formatMessage({ id: 'errors.filtered-causes-error' });
      }
      return null;
    },
    [formatMessage],
  );
};

export const useFetchCauses = (pageSize = PAGE_SIZE) => {
  let pendingRequest: request.SuperAgentRequest | undefined;
  let useFilters = false;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const errorHandler = useFetchCausesErrorHandler();

  const [{ loading: loadingFetch, error }, doFetchCauses] = useTypedAsyncFn(
    async ({ page, filters }: { page: number; filters: string }) => {
      if (pendingRequest !== undefined) {
        pendingRequest.abort();
      }
      useFilters = filters.length > 0;

      pendingRequest = coalitionApiClient.getRequestWithoutTokenCheck(
        `causes?page_size=${pageSize}&page=${page}${filters}`,
      );
      const response = await pendingRequest;
      pendingRequest = undefined;
      return response.body;
    },
    [],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error, e => errorHandler(useFilters, e));
    }
  }, [error, errorHandler, useFilters]);

  const { loading: loadingFollowed, doFetchFollowedCauses } = useFetchFollowedCauses();

  const fetch = useCallback(
    async (page: number, filters: Filters) => {
      const causes = await doFetchCauses({
        page,
        filters: buildFilteredByUrl(filters),
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
    [dispatch, doFetchCauses, doFetchFollowedCauses, isUserLoggedIn],
  );

  const fetchFirstPage = useCallback(
    async (filters: Filters) => {
      dispatch(resetCauses());
      await fetch(1, filters);
    },
    [dispatch, fetch],
  );

  const fetchNextPage = useCallback(
    async (filters: Filters) => {
      if (!hasMore) return;

      await fetch(page, filters);
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
    async (withQuickActions = false) => {
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

/* eslint-enable max-lines */
