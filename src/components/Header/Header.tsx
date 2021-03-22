import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useLogin } from 'redux/Login/hooks/useLogin';
import { getIsMobile } from 'services/mobile/mobile';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import { useFetchCurrentUser } from 'redux/User/hooks/useFetchCurrentUser';

const Header: React.FC = () => {
  const { search } = useLocation();
  const [, login] = useLogin();
  const { fetchCurrentUser } = useFetchCurrentUser();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code !== null) {
      login({ code }).then(fetchCurrentUser);
    }
  }, [login, search]);

  if (getIsMobile()) {
    return <MobileHeader />;
  }
  return <DesktopHeader />;
};

export default Header;
