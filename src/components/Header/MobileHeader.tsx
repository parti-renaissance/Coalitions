import { DefaultLink } from 'components/Link/Link';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PATHS } from 'routes';
import { oauthUrl } from 'services/networking/auth';
import { HeaderContainer, HeaderSubContainer, HeaderTitle, LogLink } from './Header.style';

type MobileHeaderProps = {
  isUserLoggedIn: boolean;
};

export const MobileHeader: React.FC<MobileHeaderProps> = ({ isUserLoggedIn }) => (
  <HeaderContainer>
    <HeaderSubContainer>
      <DefaultLink to={PATHS.HOME.url()}>
        <HeaderTitle>Jemengage</HeaderTitle>
      </DefaultLink>
    </HeaderSubContainer>
    <HeaderSubContainer>
      {isUserLoggedIn ? (
        <LogLink>
          <FormattedMessage id="header.logout" />
        </LogLink>
      ) : (
        <LogLink href={oauthUrl}>
          <FormattedMessage id="header.login" />
        </LogLink>
      )}
    </HeaderSubContainer>
  </HeaderContainer>
);
