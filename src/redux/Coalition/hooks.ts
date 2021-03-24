import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { coalitionApiClient } from 'services/networking/client';
import { updateCoalitions } from './slice';
import { Coalition } from './types';
import HandleErrorService from 'services/HandleErrorService';

export const useFetchCoalitions = () => {
  const dispatch = useDispatch();

  const [{ loading: isFetchingCoalitions }, doFetchCoalitions] = useTypedAsyncFn(
    async () => await coalitionApiClient.get(`coalitions`),
    [],
  );

  const fetchCoalitions = useCallback(async () => {
    const coalitions: Coalition[] = await coalitionApiClient.get(`coalitions`);

    if (coalitions instanceof Error) {
      HandleErrorService.showErrorSnackbar(coalitions);
    }

    dispatch(updateCoalitions(coalitions));
  }, [dispatch, doFetchCoalitions]);

  return { fetchCoalitions, isFetchingCoalitions };
};
