import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { authenticatedApiClient } from 'services/networking/client';
import { optimisticallyMarkCauseAsSupported } from '..';
import HandleErrorService from 'services/HandleErrorService';

export const useCauseFollow = (id: string) => {
  const dispatch = useDispatch();

  const [{ loading, error }, doFollowCause] = useTypedAsyncFn(
    async () => await authenticatedApiClient.put(`v3/causes/${id}/follower`, null),
    [],
  );

  const followCause = useCallback(async () => {
    const response = await authenticatedApiClient.put(`v3/causes/${id}/follower`, null);

    if (response instanceof Error) {
      HandleErrorService.showErrorSnackbar(response);
    }

    if (response.uuid !== undefined) {
      dispatch(optimisticallyMarkCauseAsSupported(id));
    }
  }, [dispatch, doFollowCause, id]);

  return { loading, error, followCause };
};
