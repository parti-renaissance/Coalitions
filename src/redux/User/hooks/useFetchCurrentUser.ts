import { authenticatedApiClient } from 'services/networking/client';
import { useDispatch } from 'react-redux';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { useCallback, useEffect } from 'react';
import { updateCurrentUser } from '../slice';
import HandleErrorService from 'services/HandleErrorService';

export const useFetchCurrentUser = () => {
  const dispatch = useDispatch();

  const [{ loading, error }, doFetchCurrentUser] = useTypedAsyncFn(
    async () => await authenticatedApiClient.get('me'),
    [],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const fetch = useCallback(async () => {
    const currentUser = await doFetchCurrentUser();

    if (currentUser instanceof Error) {
      return;
    }

    dispatch(
      updateCurrentUser({
        uuid: currentUser.uuid,
        firstName: currentUser.first_name,
        email: currentUser.email_address,
      }),
    );
  }, [dispatch, doFetchCurrentUser]);

  return {
    isFetchingCurrentUser: loading,
    fetchCurrentUser: fetch,
  };
};
