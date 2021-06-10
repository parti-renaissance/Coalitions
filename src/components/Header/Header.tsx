import React, { useEffect, Suspense } from 'react';
import lazy from 'react-lazy-ssr';
import { useLocation } from 'react-router';
import { useLogin } from 'redux/Login/hooks/useLogin';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import { useFetchCurrentUser } from 'redux/User/hooks/useFetchCurrentUser';
import useSelector from 'redux/useSelector';
import { isUserLogged } from 'redux/Login';
import { getCurrentUser } from 'redux/User/selectors';
import { getIsDesktop } from 'services/mobile/mobile';
const CGUModal = lazy(() => import('../CGUModal/CGUModal'), { chunkName: 'CGUModal' });

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
      {getIsDesktop() ? <DesktopHeader /> : <MobileHeader />}
      <Suspense fallback={null}>
        <CGUModal isOpened={shouldDisplayCGU} onClose={acceptCGU} />
      </Suspense>
    </>
  );
};

export default Header;
