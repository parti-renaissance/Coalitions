import { authenticatedApiClient } from 'services/networking/client';
import { useDispatch } from 'react-redux';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { useCallback, useEffect, useState } from 'react';
import { updateCurrentUser } from '../slice';
import HandleErrorService from 'services/HandleErrorService';

export const useFetchCurrentUser = () => {
  const dispatch = useDispatch();
  const [shouldDisplayCGU, setShouldDisplayCGU] = useState(false);

  const [{ loading, error }, doFetchCurrentUser] = useTypedAsyncFn(
    async () => await authenticatedApiClient.get('v3/profile/me'),
    [],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const fetchCurrentUser = useCallback(async () => {
    const currentUser = await doFetchCurrentUser();

    if (currentUser instanceof Error) {
      return;
    }

    dispatch(
      updateCurrentUser({
        uuid: currentUser.uuid,
        firstName: currentUser.first_name,
        lastName: currentUser.last_name,
        email: currentUser.email_address,
        isAdherent: currentUser.adherent,
      }),
    );
    setShouldDisplayCGU(currentUser.adherent);
  }, [dispatch, doFetchCurrentUser]);

  const acceptCGU = () => {
    setShouldDisplayCGU(false);
  };

  return {
    isFetchingCurrentUser: loading,
    fetchCurrentUser,
    shouldDisplayCGU,
    acceptCGU,
  };
};
