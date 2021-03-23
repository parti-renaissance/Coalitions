import React, { FunctionComponent, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  HeaderContainer,
  HeaderSubContainer,
  BurgerIcon,
  StyledButton,
  HeaderTitle,
  DrawerMenu,
  CloseButton,
  CloseIcon,
} from './Header.style';
import { DefaultLink } from 'components/Link/Link';
import { PATHS } from 'routes';
import LogInOrOutButton from './components/LogInOrOutButton';

export const MobileHeader: FunctionComponent<{}> = () => {
  const [isDrawerMenuOpened, setIsDrawerMenuOpened] = useState<boolean>(false);

  const getCloseOrOpenDrawerMenu = (isOpened: boolean) => () => {
    setIsDrawerMenuOpened(isOpened);
  };

  return (
    <>
      <HeaderContainer>
        <HeaderSubContainer>
          <StyledButton onClick={getCloseOrOpenDrawerMenu(true)}>
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
      <DrawerMenu open={isDrawerMenuOpened} onClose={getCloseOrOpenDrawerMenu(false)}>
        <CloseButton onClick={getCloseOrOpenDrawerMenu(false)}>
          <CloseIcon />
        </CloseButton>
      </DrawerMenu>
    </>
  );
};
