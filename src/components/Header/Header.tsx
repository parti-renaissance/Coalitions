import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import Link from 'components/Link';
import { PATHS } from 'routes';
import { HeaderContainer } from './Header.style';
import { getUserToken } from 'redux/Login';
import useSelector from 'redux/useSelector';
import { useLocation } from 'react-router';
import { useLogin } from 'redux/Login/hooks';

const oauthUrl = process.env.REACT_APP_OAUTH_URL;
const oauthClientId = process.env.REACT_APP_OAUTH_CLIENT_ID;

const Header: React.FC = () => {
  const { search } = useLocation();
  const [, login] = useLogin();
  const isUserLoggedIn = Boolean(useSelector(getUserToken));

  useEffect(() => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code !== null) {
      login({ code });
    }
  }, [login, search]);

  return (
    <HeaderContainer>
      <RouterLink to={PATHS.HOME.url()}>
        <div>En Marche</div>
      </RouterLink>
      {isUserLoggedIn && (
        <Link as="button">
          <FormattedMessage id="header.logout" />
        </Link>
      )}
      {!isUserLoggedIn && (
        <Link
          href={`${oauthUrl}?response_type=code&client_id=${oauthClientId}&redirect_url=${window.location.href}`}
        >
          <FormattedMessage id="header.login" />
        </Link>
      )}
    </HeaderContainer>
  );
};

export default Header;
