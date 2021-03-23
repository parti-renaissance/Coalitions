import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  HeaderContainer,
  HeaderSubContainer,
  BurgerIcon,
  StyledButton,
  HeaderTitle,
} from './Header.style';
import { DefaultLink } from 'components/Link/Link';
import { PATHS } from 'routes';
import LogInOrOutButton from './components/LogInOrOutButton';

export const MobileHeader: FunctionComponent<{}> = () => (
  <HeaderContainer>
    <HeaderSubContainer>
      <StyledButton>
        <BurgerIcon src="/images/burgerIcon.svg" />
      </StyledButton>
      <DefaultLink to={PATHS.HOME.url()}>
        <HeaderTitle>
          <FormattedMessage id="header.app-name" />
        </HeaderTitle>
      </DefaultLink>
    </HeaderSubContainer>
    <HeaderSubContainer>
      <LogInOrOutButton />
    </HeaderSubContainer>
  </HeaderContainer>
);
