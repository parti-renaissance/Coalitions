import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { coalitionApiClient } from 'services/networking/client';
import { updateCoalitions, markCoalitionsAsFollowed } from '../slice';
import { Coalition } from '../types';
import HandleErrorService from 'services/HandleErrorService';
import { useFetchFollowedCoalitions } from './useFetchFollowedCoalitions';
import useSelector from 'redux/useSelector';
import { isUserLogged } from 'redux/Login/selectors';

export const useFetchCoalitions = () => {
  const dispatch = useDispatch();
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));

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

    const followedCoalitions = await doFetchFollowedCoalitions(isUserLoggedIn);

    dispatch(updateCoalitions(coalitions));
    dispatch(markCoalitionsAsFollowed(followedCoalitions));
  }, [dispatch, doFetchCoalitions, doFetchFollowedCoalitions, isUserLoggedIn]);

  return { fetchCoalitions, isFetchingCoalitions: isFetchingCoalitions || loadingFollowed };
};
