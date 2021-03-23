import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useLogin } from 'redux/Login/hooks/useLogin';
import { getIsMobile } from 'services/mobile/mobile';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import { useFetchCurrentUser } from 'redux/User/hooks/useFetchCurrentUser';
import useSelector from 'redux/useSelector';
import { isUserLogged } from 'redux/Login';
import { getCurrentUser } from 'redux/User/selectors';

const Header: React.FC = () => {
  const { search } = useLocation();
  const [, login] = useLogin();
  const { fetchCurrentUser } = useFetchCurrentUser();
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const currentUser = useSelector(getCurrentUser);

  useEffect(() => {
    if (isUserLoggedIn && currentUser === undefined) {
      fetchCurrentUser();
    }
  }, [isUserLoggedIn, currentUser]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code !== null) {
      login({ code });
    }
  }, [login, search]);

  if (getIsMobile()) {
    return <MobileHeader />;
  }
  return <DesktopHeader />;
};

export default Header;
