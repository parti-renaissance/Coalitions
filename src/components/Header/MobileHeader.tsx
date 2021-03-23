import React, { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  HeaderContainer,
  HeaderSubContainer,
  BurgerIcon,
  StyledButton,
  HeaderTitle,
  DrawerMenu,
  CloseButton,
  CloseIcon,
  MenuLinkContainer,
  MenuLinkLabel,
  ChevronRight,
} from './Header.style';
import { DefaultLink } from 'components/Link/Link';
import { PATHS } from 'routes';
import LogInOrOutButton from './components/LogInOrOutButton';

const MenuLink: FunctionComponent<{ label: string; linkTo: string; onClick: () => void }> = ({
  label,
  linkTo,
  onClick,
}) => (
  <MenuLinkContainer to={linkTo} onClick={onClick}>
    <MenuLinkLabel>{label}</MenuLinkLabel>
    <ChevronRight src="/images/chevronDown.svg" />
  </MenuLinkContainer>
);

const MENU_LINKS: { labelId: string; linkTo: string }[] = [
  { labelId: 'header.home', linkTo: PATHS.HOME.url() },
  { labelId: 'header.causes', linkTo: PATHS.CAUSE_LIST.url() },
  { labelId: 'header.coalitions', linkTo: `${PATHS.HOME.url()}#coalitions` },
];

export const MobileHeader: FunctionComponent<{}> = () => {
  const [isDrawerMenuOpened, setIsDrawerMenuOpened] = useState<boolean>(false);
  const intl = useIntl();

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
        {MENU_LINKS.map(({ labelId, linkTo }) => (
          <MenuLink
            label={intl.formatMessage({ id: labelId })}
            linkTo={linkTo}
            onClick={getCloseOrOpenDrawerMenu(false)}
          />
        ))}
      </DrawerMenu>
    </>
  );
};
