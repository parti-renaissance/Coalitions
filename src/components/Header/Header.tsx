import React, { useEffect } from 'react';
import { isUserLogged, userLoggedOut } from 'redux/Login';
import useSelector from 'redux/useSelector';
import { useLocation } from 'react-router';
import { useLogin } from 'redux/Login/hooks/useLogin';
import { getIsMobile } from 'services/mobile/mobile';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import { useDispatch } from 'react-redux';
import { oauthUrl } from 'services/networking/auth';

const Header: React.FC = () => {
  const { search } = useLocation();
  const [, login] = useLogin();
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const dispatch = useDispatch();

  const onLogClick = () => {
    if (isUserLoggedIn) {
      dispatch(userLoggedOut());
    } else {
      window.location.href = oauthUrl;
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code !== null) {
      login({ code });
    }
  }, [login, search]);

  if (getIsMobile()) {
    return <MobileHeader isUserLoggedIn={isUserLoggedIn} onLogClick={onLogClick} />;
  }
  return <DesktopHeader isUserLoggedIn={isUserLoggedIn} onLogClick={onLogClick} />;
};

export default Header;
