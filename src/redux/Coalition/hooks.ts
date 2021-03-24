import { useCallback } from 'react';
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

  const fetchCoalitions = useCallback(async () => {
    const coalitions: Coalition[] = await doFetchCoalitions();

    if (coalitions instanceof Error) {
      return;
    }

    dispatch(updateCoalitions(coalitions));
  }, [dispatch, doFetchCoalitions]);

  if (error) {
    HandleErrorService.showErrorSnackbar(error);
  }

  return { fetchCoalitions, isFetchingCoalitions };
};
