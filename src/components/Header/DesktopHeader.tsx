import React, { useState, MouseEvent, FunctionComponent } from 'react';
import { DefaultLink } from 'components/Link/Link';
import { FormattedMessage } from 'react-intl';
import { PATHS } from 'routes';
import {
  HeaderContainer,
  HeaderSubContainer,
  HeaderTitle,
  SubCategory,
  LogLink,
  FirstNameContainer,
  UserIcon,
  StyledDesktopUserMenu,
} from './Header.style';
import { isUserLogged, userLoggedOut } from 'redux/Login';
import useSelector from 'redux/useSelector';
import { useDispatch } from 'react-redux';
import { oauthUrl } from 'services/networking/auth';
import { getCurrentUser } from 'redux/User/selectors';
import MenuItem from '@material-ui/core/MenuItem';
import { MediumLargeButton } from 'components/Button/Button';

export const DesktopHeader: FunctionComponent<{}> = () => {
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

  const renderLoginOrOutButton = () => {
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

    return null;
  };

  return (
    <HeaderContainer>
      <HeaderSubContainer>
        <DefaultLink to={PATHS.HOME.url()}>
          <HeaderTitle>
            <FormattedMessage id="header.app-name" />
          </HeaderTitle>
        </DefaultLink>
        <DefaultLink to={PATHS.HOME.url()}>
          <SubCategory>
            <FormattedMessage id="header.causes" />
          </SubCategory>
        </DefaultLink>
        <DefaultLink to={PATHS.HOME.url()}>
          <SubCategory>
            <FormattedMessage id="header.coalitions" />
          </SubCategory>
        </DefaultLink>
      </HeaderSubContainer>
      <HeaderSubContainer>
        <DefaultLink to={PATHS.OUR_MISSION.url()}>
          <MediumLargeButton variant="contained" color="primary">
            <FormattedMessage id="header.cause-creation" />
          </MediumLargeButton>
        </DefaultLink>
        {renderLoginOrOutButton()}
      </HeaderSubContainer>
    </HeaderContainer>
  );
};
