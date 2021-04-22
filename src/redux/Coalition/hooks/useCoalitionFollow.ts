import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { authenticatedApiClient } from 'services/networking/client';
import { optimisticallyMarkCoalitionAsFollowed, optimisticallyRemoveFollow } from '..';
import HandleErrorService, { APIErrorsType, doesErrorIncludes } from 'services/HandleErrorService';
import { useIntl } from 'react-intl';

const useCoalitionFollowErrorHandler = () => {
  const { formatMessage } = useIntl();

  return useCallback(
    (error?: APIErrorsType) => {
      if (error instanceof Response || error === undefined || error.message === undefined) {
        return null;
      }
      if (doesErrorIncludes(error, 'Cette valeur est déjà utilisée')) {
        return formatMessage({ id: 'errors.already-followed-coalition' });
      }
      return null;
    },
    [formatMessage],
  );
};

export const useCoalitionFollow = (id: string) => {
  const dispatch = useDispatch();
  const errorHandler = useCoalitionFollowErrorHandler();

  const [{ loading, error }, doFollowCoalition] = useTypedAsyncFn(
    async () => await authenticatedApiClient.put(`v3/coalitions/${id}/follower`, null),
    [],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error, errorHandler);
    }
  }, [error, errorHandler]);

  const followCoalition = useCallback(async () => {
    const response = await doFollowCoalition();

    if (response instanceof Error) {
      return;
    }

    if (response.uuid !== undefined) {
      dispatch(optimisticallyMarkCoalitionAsFollowed(id));
    }
  }, [dispatch, doFollowCoalition, id]);

  return { loading, followCoalition };
};

export const useCoalitionUnfollow = (id: string) => {
  const dispatch = useDispatch();

  const [{ loading, error }, doUnfollowCoalition] = useTypedAsyncFn(
    async () => await authenticatedApiClient.delete(`v3/coalitions/${id}/follower`, null),
    [],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const unfollowCoalition = useCallback(async () => {
    const response = await doUnfollowCoalition();

    if (response instanceof Error) {
      return;
    }

    dispatch(optimisticallyRemoveFollow(id));
  }, [dispatch, doUnfollowCoalition, id]);

  return { loading, unfollowCoalition };
};
