import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CauseStatistics, updateCauseStatistics } from 'redux/Cause';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import HandleErrorService from 'services/HandleErrorService';
import { coalitionApiClient } from 'services/networking/client';

export const useFetchCauseStatistics = () => {
  const dispatch = useDispatch();

  const [{ loading, error }, doFetchCauseStatistics] = useTypedAsyncFn(
    async () => await coalitionApiClient.get('causes/statistiques'),
    [],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const fetchCauseStatistics = useCallback(async () => {
    const statistics: CauseStatistics = await doFetchCauseStatistics();

    if (statistics instanceof Error) {
      return;
    }

    dispatch(updateCauseStatistics(statistics));
  }, [dispatch, doFetchCauseStatistics]);

  return { loading, fetchCauseStatistics };
};
