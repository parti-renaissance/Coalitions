import { DefaultLink } from 'components/Link/Link';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PATHS } from 'routes';
import { oauthUrl } from 'services/networking/auth';
import {
  CreateCauseButton,
  HeaderContainer,
  HeaderSubContainer,
  HeaderTitle,
  SubCategory,
  LogLink,
} from './Header.style';

type DesktopHeaderProps = {
  isUserLoggedIn: boolean;
};

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({ isUserLoggedIn }) => (
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
        <CreateCauseButton variant="contained" color="primary">
          <FormattedMessage id="header.cause-creation" />
        </CreateCauseButton>
      </DefaultLink>
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
