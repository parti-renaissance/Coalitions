import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { authenticatedApiClient } from 'services/networking/client';
import { optimisticallyMarkCauseAsSupported, optimisticallyRemoveSupport } from '..';
import HandleErrorService, { APIErrorsType, doesErrorIncludes } from 'services/HandleErrorService';
import { useIntl } from 'react-intl';

const useCauseFollowErrorHandler = () => {
  const { formatMessage } = useIntl();

  return useCallback(
    (error?: APIErrorsType) => {
      if (error instanceof Response || error === undefined || error.message === undefined) {
        return null;
      }
      if (doesErrorIncludes(error, 'Cette valeur est déjà utilisée')) {
        return formatMessage({ id: 'errors.already-followed-cause' });
      }
      return null;
    },
    [formatMessage],
  );
};

export const useCauseFollow = (id: string | undefined) => {
  const dispatch = useDispatch();
  const errorHandler = useCauseFollowErrorHandler();

  const [{ loading, error }, doFollowCause] = useTypedAsyncFn(async () => {
    if (id === undefined) {
      return;
    }
    return await authenticatedApiClient.put(`v3/causes/${id}/follower`, null);
  }, [id]);

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error, errorHandler);
    }
  }, [error, errorHandler]);

  const followCause = useCallback(async () => {
    if (id === undefined) {
      return;
    }

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

export const useCauseUnfollow = (id: string) => {
  const dispatch = useDispatch();

  const [{ loading, error }, doUnfollowCause] = useTypedAsyncFn(
    async () => await authenticatedApiClient.delete(`v3/causes/${id}/follower`, null),
    [],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const unfollowCause = useCallback(async () => {
    const response = await doUnfollowCause();

    if (response instanceof Error) {
      return;
    }

    dispatch(optimisticallyRemoveSupport(id));
  }, [dispatch, doUnfollowCause, id]);

  return { loading, unfollowCause };
};
