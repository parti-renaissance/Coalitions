import React from 'react';
import { FormattedMessage } from 'react-intl';
import { oauthUrl } from 'services/networking/auth';
import { HeaderContainer, HeaderSubContainer, LogLink } from './Header.style';

type MobileHeaderProps = {
  isUserLoggedIn: boolean;
};

export const MobileHeader: React.FC<MobileHeaderProps> = ({ isUserLoggedIn }) => (
  <HeaderContainer>
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
