import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCurrentUser } from 'redux/User';
import { logoutUrl } from 'services/networking/auth';
import { userLoggedOut } from '..';

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = useCallback(async () => {
    window.location.href = logoutUrl;
    dispatch(userLoggedOut());
    dispatch(deleteCurrentUser());
  }, [dispatch]);

  return { logout };
};
