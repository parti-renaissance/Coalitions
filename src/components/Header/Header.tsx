import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useLogin } from 'redux/Login/hooks/useLogin';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import { useFetchCurrentUser } from 'redux/User/hooks/useFetchCurrentUser';
import useSelector from 'redux/useSelector';
import { isUserLogged } from 'redux/Login';
import { getCurrentUser } from 'redux/User/selectors';
import { CGUModal } from './components/CGUModal/CGUModal';
import { getIsDesktop } from 'services/mobile/mobile';

const Header: React.FC = () => {
  const { search } = useLocation();
  const [, login] = useLogin();
  const { fetchCurrentUser, shouldDisplayCGU, acceptCGU } = useFetchCurrentUser();
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const currentUser = useSelector(getCurrentUser);

  useEffect(() => {
    if (isUserLoggedIn && currentUser === undefined) {
      fetchCurrentUser();
    }
  }, [isUserLoggedIn, currentUser, fetchCurrentUser]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code !== null) {
      login({ code });
    }
  }, [login, search]);

  return (
    <>
      {getIsDesktop() ? <DesktopHeader /> : <MobileHeader />};
      <CGUModal isOpened={shouldDisplayCGU} onClose={acceptCGU} />
    </>
  );
};

export default Header;
