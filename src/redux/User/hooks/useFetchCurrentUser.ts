import { authenticatedApiClient } from 'services/networking/client';
import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { updateCurrentUser } from '../slice';
import HandleErrorService from 'services/HandleErrorService';

export const useFetchCurrentUser = () => {
  const dispatch = useDispatch();
  const [isFetchingCurrentUser, setIsFetchingCurrentUser] = useState(false);

  const fetchCurrentUser = useCallback(async () => {
    setIsFetchingCurrentUser(true);
    try {
      const currentUser = await authenticatedApiClient.get('me');
      dispatch(
        updateCurrentUser({
          uuid: currentUser.uuid,
          firstName: currentUser.first_name,
          email: currentUser.email_address,
        }),
      );
    } catch (e) {
      HandleErrorService.showErrorSnackbar(e);
    } finally {
      setIsFetchingCurrentUser(false);
    }
  }, [dispatch]);

  return {
    isFetchingCurrentUser,
    fetchCurrentUser,
  };
};
