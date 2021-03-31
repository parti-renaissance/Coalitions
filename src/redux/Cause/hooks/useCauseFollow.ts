import { useCallback, useEffect } from 'react';
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

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const followCause = useCallback(async () => {
    const response = await doFollowCause();

    if (response instanceof Error) {
      return;
    }

    if (response.uuid !== undefined) {
      dispatch(optimisticallyMarkCauseAsSupported(id));
    }
  }, [dispatch, doFollowCause, id]);

  return { loading, followCause };
};
