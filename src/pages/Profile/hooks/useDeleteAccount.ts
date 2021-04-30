import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { userLoggedOut } from 'redux/Login';
import { deleteCurrentUser } from 'redux/User';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { PATHS } from 'routes';
import HandleErrorService from 'services/HandleErrorService';
import { authenticatedApiClient } from 'services/networking/client';

export const useDeleteAccount = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const [{ loading, error }, doDeleteAccount] = useTypedAsyncFn(
    async () => await authenticatedApiClient.post('v3/profile/unregister', null),
    [],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const deleteAccount = useCallback(async () => {
    const response = await doDeleteAccount();

    if (response instanceof Error) {
      return;
    }

    dispatch(userLoggedOut());
    dispatch(deleteCurrentUser());
    push(PATHS.HOME.url());
  }, [dispatch, doDeleteAccount, push]);

  return { loading, deleteAccount };
};
