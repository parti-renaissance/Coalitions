import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { coalitionApiClient } from 'services/networking/client';
import { updateCoalitions } from './slice';
import { Coalition } from './types';

export const useFetchCoalitions = () => {
  const dispatch = useDispatch();

  const [, doFetchCoalitions] = useTypedAsyncFn(
    async () => await coalitionApiClient.get(`coalitions`),
    [],
  );

  const fetchCoalitions = useCallback(async () => {
    const coalitions: Coalition[] = await doFetchCoalitions();
    dispatch(updateCoalitions(coalitions));
  }, [dispatch, doFetchCoalitions]);

  return { fetchCoalitions };
};
