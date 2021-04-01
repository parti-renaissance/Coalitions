import React, { useState, MouseEvent, FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  FirstNameContainer,
  UserIcon,
  StyledDesktopUserMenu,
  FirstName,
} from './LogInOrOutButton.style';
import { isUserLogged, userLoggedOut } from 'redux/Login';
import useSelector from 'redux/useSelector';
import { useDispatch } from 'react-redux';
import { oauthUrl } from 'services/networking/auth';
import { getCurrentUser } from 'redux/User/selectors';
import MenuItem from '@material-ui/core/MenuItem';
import { getIsMobile } from 'services/mobile/mobile';
import { StyledButton } from '../../Header.style';

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
      <StyledButton onClick={login}>
        {getIsMobile() ? (
          <UserIcon src="/images/user.svg" />
        ) : (
          <FormattedMessage id="header.login" />
        )}
      </StyledButton>
    );
  }

  if (currentUser !== undefined) {
    return (
      <>
        <StyledButton onClick={showDesktopUserMenu as () => void}>
          <FirstNameContainer>
            <UserIcon src="/images/user.svg" />
            <FirstName>{currentUser.firstName}</FirstName>
          </FirstNameContainer>
        </StyledButton>
        <StyledDesktopUserMenu
          anchorEl={desktopUserMenu}
          keepMounted
          open={Boolean(desktopUserMenu)}
          onClose={closeDesktopUserMenu}
        >
          <MenuItem onClick={logout}>
            <FormattedMessage id="header.logout" />
          </MenuItem>
        </StyledDesktopUserMenu>
      </>
    );
  }

  return (
    <StyledButton onClick={logout}>
      <FormattedMessage id="header.logout" />
    </StyledButton>
  );
};

export default LogInOrOutButton;
