import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  HeaderContainer,
  HeaderSubContainer,
  LogLink,
  BurgerIcon,
  StyledButton,
} from './Header.style';
import { isUserLogged, userLoggedOut } from 'redux/Login';
import useSelector from 'redux/useSelector';
import { useDispatch } from 'react-redux';
import { oauthUrl } from 'services/networking/auth';

export const MobileHeader: FunctionComponent<{}> = () => {
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const dispatch = useDispatch();

  const onLogClick = () => {
    if (isUserLoggedIn) {
      dispatch(userLoggedOut());
    } else {
      window.location.href = oauthUrl;
    }
  };

  return (
    <HeaderContainer>
      <HeaderSubContainer>
        <StyledButton>
          <BurgerIcon src="/images/burgerIcon.svg" />
        </StyledButton>
      </HeaderSubContainer>
      <HeaderSubContainer>
        <LogLink onClick={onLogClick}>
          {isUserLoggedIn ? (
            <FormattedMessage id="header.logout" />
          ) : (
            <FormattedMessage id="header.login" />
          )}
        </LogLink>
      </HeaderSubContainer>
    </HeaderContainer>
  );
};
