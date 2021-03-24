import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authenticatedApiClient } from 'services/networking/client';
import { optimisticallyMarkCauseAsSupported } from '..';
import HandleErrorService from 'services/HandleErrorService';

export const useCauseFollow = (id: string) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const followCause = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authenticatedApiClient.put(`v3/causes/${id}/follower`, null);
      if (response.uuid !== undefined) {
        dispatch(optimisticallyMarkCauseAsSupported(id));
      }
    } catch (e) {
      HandleErrorService.showErrorSnackbar(e);
    } finally {
      setLoading(false);
    }
  }, [dispatch, id]);

  return { loading, followCause };
};
