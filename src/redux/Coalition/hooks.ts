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
    try {
      const coalitions: Coalition[] = await doFetchCoalitions();
      dispatch(updateCoalitions(coalitions));
    } catch (e) {
      HandleErrorService.showErrorSnackbar(e);
    }
  }, [dispatch, doFetchCoalitions]);

  return { fetchCoalitions, isFetchingCoalitions };
};
