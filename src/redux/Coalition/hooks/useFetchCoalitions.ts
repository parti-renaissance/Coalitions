import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { coalitionApiClient } from 'services/networking/client';
import { updateCoalitions, markCoalitionsAsFollowed } from '../slice';
import { Coalition } from '../types';
import HandleErrorService from 'services/HandleErrorService';
import { useFetchFollowedCoalitions } from './useFetchFollowedCoalitions';

export const useFetchCoalitions = () => {
  const dispatch = useDispatch();

  const { loading: loadingFollowed, doFetchFollowedCoalitions } = useFetchFollowedCoalitions();

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

    const followedCoalitions = await doFetchFollowedCoalitions();

    dispatch(updateCoalitions(coalitions));
    dispatch(markCoalitionsAsFollowed(followedCoalitions));
  }, [dispatch, doFetchCoalitions, doFetchFollowedCoalitions]);

  return { fetchCoalitions, isFetchingCoalitions: isFetchingCoalitions || loadingFollowed };
};
