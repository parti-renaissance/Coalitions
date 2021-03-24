import { authenticatedApiClient } from 'services/networking/client';
import { useDispatch } from 'react-redux';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { useCallback } from 'react';
import { updateCurrentUser } from '../slice';
import HandleErrorService from 'services/HandleErrorService';

export const useFetchCurrentUser = () => {
  const dispatch = useDispatch();

  const [{ loading, error }, doFetchCurrentUser] = useTypedAsyncFn(
    async () => await authenticatedApiClient.get('me'),
    [],
  );

  const fetchCurrentUser = useCallback(async () => {
    const currentUser = await doFetchCurrentUser();

    if (currentUser instanceof Error) {
      HandleErrorService.showErrorSnackbar(currentUser);
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
    errorFetchingCurrentUser: error,
    fetchCurrentUser,
  };
};
