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
  MenuHashLinkContainer,
  MenuLinkLabel,
  ChevronRight,
  CreateCauseWrapper,
} from './Header.style';
import { DefaultLink } from 'components/Link/Link';
import { PATHS } from 'routes';
import LogInOrOutButton from './components/LogInOrOutButton';
import { FullWidthButton } from 'components/Button/Button';
import SearchBar from './components/SearchBar';
import { useLocation } from 'react-router';

const MenuLink: FunctionComponent<{
  label: string;
  linkTo: string;
  isHashLink?: boolean;
  onClick: () => void;
}> = ({ label, linkTo, isHashLink, onClick }) => {
  const Container = (isHashLink === true
    ? MenuHashLinkContainer
    : MenuLinkContainer) as FunctionComponent<{ to: string; onClick: () => void }>;

  return (
    <Container to={linkTo} onClick={onClick}>
      <MenuLinkLabel>{label}</MenuLinkLabel>
      <ChevronRight src="/images/chevronDownBlack.svg" />
    </Container>
  );
};

const MENU_LINKS: { labelId: string; linkTo: string; isHashLink?: boolean }[] = [
  { labelId: 'header.home', linkTo: PATHS.HOME.url() },
  { labelId: 'header.causes', linkTo: PATHS.CAUSE_LIST.url() },
  {
    labelId: 'header.coalitions',
    linkTo: `${PATHS.HOME.url()}#coalitions`,
    isHashLink: true,
  },
];

export const MobileHeader: FunctionComponent<{}> = () => {
  const [isDrawerMenuOpened, setIsDrawerMenuOpened] = useState<boolean>(false);
  const { pathname } = useLocation();
  const showSearchBar = !pathname.includes(PATHS.CAUSE_LIST.url());
  const intl = useIntl();

  const closeDrawerMenu = () => {
    setIsDrawerMenuOpened(false);
  };

  const openDrawerMenu = () => {
    setIsDrawerMenuOpened(true);
  };

  return (
    <>
      <HeaderContainer>
        <HeaderSubContainer>
          <StyledButton onClick={openDrawerMenu}>
            <BurgerIcon src="/images/burgerIcon.svg" />
          </StyledButton>
          <DefaultLink to={PATHS.HOME.url()}>
            <HeaderTitle>
              <FormattedMessage id="header.app-name" />
            </HeaderTitle>
          </DefaultLink>
        </HeaderSubContainer>
        <HeaderSubContainer>
          {showSearchBar ? <SearchBar /> : null}
          <LogInOrOutButton />
        </HeaderSubContainer>
      </HeaderContainer>
      <DrawerMenu open={isDrawerMenuOpened} onClose={closeDrawerMenu}>
        <div>
          <CloseButton onClick={closeDrawerMenu}>
            <CloseIcon />
          </CloseButton>
          {MENU_LINKS.map(({ labelId, linkTo, isHashLink }) => (
            <MenuLink
              key={labelId}
              label={intl.formatMessage({ id: labelId })}
              linkTo={linkTo}
              onClick={closeDrawerMenu}
              isHashLink={isHashLink}
            />
          ))}
        </div>
        <CreateCauseWrapper to={PATHS.OUR_MISSION.url()} onClick={closeDrawerMenu}>
          <FullWidthButton size="small" variant="contained" color="primary">
            <FormattedMessage id="header.cause-creation" />
          </FullWidthButton>
        </CreateCauseWrapper>
      </DrawerMenu>
    </>
  );
};
