import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { coalitionApiClient } from 'services/networking/client';
import { updateCoalitions } from './slice';
import { Coalition } from './types';
import HandleErrorService from 'services/HandleErrorService';

export const useFetchCoalitions = () => {
  const dispatch = useDispatch();
  const [isFetchingCoalitions, setIsFetchingCoalitions] = useState(false);

  const fetchCoalitions = useCallback(async () => {
    setIsFetchingCoalitions(true);
    try {
      const coalitions: Coalition[] = await coalitionApiClient.get(`coalitions`);
      dispatch(updateCoalitions(coalitions));
    } catch (e) {
      HandleErrorService.showErrorSnackbar(e);
    } finally {
      setIsFetchingCoalitions(false);
    }
  }, [dispatch]);

  return { fetchCoalitions, isFetchingCoalitions };
};
