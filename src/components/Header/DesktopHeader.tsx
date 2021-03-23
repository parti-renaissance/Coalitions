import React, { FunctionComponent } from 'react';
import { DefaultLink, DefaultHashLink } from 'components/Link/Link';
import { FormattedMessage } from 'react-intl';
import { PATHS } from 'routes';
import {
  HeaderContainer,
  HeaderSubContainer,
  HeaderTitle,
  SubCategory,
  CreateCauseButton,
} from './Header.style';
import { MediumLargeButton } from 'components/Button/Button';
import LogInOrOutButton from './components/LogInOrOutButton';

export const DesktopHeader: FunctionComponent<{}> = () => (
  <HeaderContainer>
    <HeaderSubContainer>
      <DefaultLink to={PATHS.HOME.url()}>
        <HeaderTitle>
          <FormattedMessage id="header.app-name" />
        </HeaderTitle>
      </DefaultLink>
      <DefaultLink to={PATHS.CAUSE_LIST.url()}>
        <SubCategory>
          <FormattedMessage id="header.causes" />
        </SubCategory>
      </DefaultLink>
      <DefaultHashLink to={`${PATHS.HOME.url()}#coalitions`}>
        <SubCategory>
          <FormattedMessage id="header.coalitions" />
        </SubCategory>
      </DefaultHashLink>
    </HeaderSubContainer>
    <HeaderSubContainer>
      <CreateCauseButton to={PATHS.OUR_MISSION.url()}>
        <MediumLargeButton variant="contained" color="primary">
          <FormattedMessage id="header.cause-creation" />
        </MediumLargeButton>
      </CreateCauseButton>
      <LogInOrOutButton />
    </HeaderSubContainer>
  </HeaderContainer>
);
