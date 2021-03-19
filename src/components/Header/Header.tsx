import React, { useEffect } from 'react';
import { isUserLogged } from 'redux/Login';
import useSelector from 'redux/useSelector';
import { useLocation } from 'react-router';
import { useLogin } from 'redux/Login/hooks/useLogin';
import { getIsMobile } from 'services/mobile/mobile';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';

const Header: React.FC = () => {
  const { search } = useLocation();
  const [, login] = useLogin();
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));

  useEffect(() => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code !== null) {
      login({ code });
    }
  }, [login, search]);

  if (getIsMobile()) {
    return <MobileHeader isUserLoggedIn={isUserLoggedIn} />;
  }
  return <DesktopHeader isUserLoggedIn={isUserLoggedIn} />;
};

export default Header;
