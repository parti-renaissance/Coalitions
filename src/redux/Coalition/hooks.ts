import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { coalitionApiClient } from 'services/networking/client';
import { updateCoalitions } from './slice';
import { Coalition } from './types';
import HandleErrorService from 'services/HandleErrorService';

export const useFetchCoalitions = () => {
  const dispatch = useDispatch();

  const [{ loading: isFetchingCoalitions, error }, doFetchCoalitions] = useTypedAsyncFn(
    async () => await coalitionApiClient.get(`coalitions`),
    [],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const fetchCoalitions = useCallback(async () => {
    const coalitions: Coalition[] = await doFetchCoalitions();

    if (coalitions instanceof Error) {
      return;
    }

    dispatch(updateCoalitions(coalitions));
  }, [dispatch, doFetchCoalitions]);

  return { fetchCoalitions, isFetchingCoalitions };
};
