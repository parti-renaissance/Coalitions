import { coalitionApiClient } from 'services/networking/client';
import { useDispatch } from 'react-redux';
import { updateCauses } from './slice';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { useCallback, useState } from 'react';

const PAGE_SIZE = 12;

export const useFetchCauses = (pageSize = PAGE_SIZE) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  const [{ loading, error }, doFetchCauses] = useTypedAsyncFn(
    async (page: number) =>
      await coalitionApiClient.get(`causes?page_size=${pageSize}&page=${page}`),
    [],
  );

  const fetchFirstPage = useCallback(async () => {
    const causes = await doFetchCauses(1);
    dispatch(updateCauses({ causes: causes.items, numberOfCauses: causes.metadata.total_items }));
    if (causes.items.length < pageSize) {
      setHasMore(false);
    }
    setPage(2);
  }, [doFetchCauses, dispatch, pageSize]);

  const fetchNextPage = useCallback(async () => {
    if (!hasMore) return;

    const causes = await doFetchCauses(page);
    dispatch(updateCauses({ causes: causes.items, numberOfCauses: causes.metadata.total_items }));
    if (causes.items.length < pageSize) {
      setHasMore(false);
    }
    setPage(page + 1);
  }, [hasMore, doFetchCauses, page, dispatch, pageSize]);

  return { hasMore, loading, error, fetchFirstPage, fetchNextPage };
};
