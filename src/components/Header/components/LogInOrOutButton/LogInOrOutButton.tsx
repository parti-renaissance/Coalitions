import React, { useState, MouseEvent, FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  FirstNameContainer,
  UserIcon,
  StyledDesktopUserMenu,
  LogLink,
} from './LogInOrOutButton.style';
import { isUserLogged, userLoggedOut } from 'redux/Login';
import useSelector from 'redux/useSelector';
import { useDispatch } from 'react-redux';
import { oauthUrl } from 'services/networking/auth';
import { getCurrentUser } from 'redux/User/selectors';
import MenuItem from '@material-ui/core/MenuItem';

const LogInOrOutButton: FunctionComponent<{}> = () => {
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const [desktopUserMenu, setDesktopUserMenu] = useState<null | HTMLAnchorElement>(null);

  const login = () => {
    window.location.href = oauthUrl;
  };

  const logout = () => {
    dispatch(userLoggedOut());
  };

  const showDesktopUserMenu = (event: MouseEvent<HTMLAnchorElement>) => {
    setDesktopUserMenu(event.currentTarget);
  };

  const closeDesktopUserMenu = () => {
    setDesktopUserMenu(null);
  };

  if (!isUserLoggedIn) {
    return (
      <LogLink onClick={login}>
        <FormattedMessage id="header.login" />
      </LogLink>
    );
  }

  if (currentUser !== undefined) {
    return (
      <>
        <LogLink onClick={showDesktopUserMenu}>
          <FirstNameContainer>
            <UserIcon src="/images/user.svg" />
            {currentUser.firstName}
          </FirstNameContainer>
        </LogLink>
        <StyledDesktopUserMenu
          anchorEl={desktopUserMenu}
          keepMounted
          open={Boolean(desktopUserMenu)}
          onClose={closeDesktopUserMenu}
        >
          <MenuItem onClick={logout}>
            <FormattedMessage id="header.logout" />
          </MenuItem>
          <MenuItem>
            <FormattedMessage id="header.profile" />
          </MenuItem>
        </StyledDesktopUserMenu>
      </>
    );
  }

  return (
    <LogLink onClick={logout}>
      <FormattedMessage id="header.logout" />
    </LogLink>
  );
};

export default LogInOrOutButton;
