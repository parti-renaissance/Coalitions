import React from 'react';
import { FormattedMessage } from 'react-intl';
import { HeaderContainer, HeaderSubContainer, LogLink } from './Header.style';

type MobileHeaderProps = {
  isUserLoggedIn: boolean;
  onLogClick: () => void;
};

export const MobileHeader: React.FC<MobileHeaderProps> = ({ isUserLoggedIn, onLogClick }) => (
  <HeaderContainer>
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
