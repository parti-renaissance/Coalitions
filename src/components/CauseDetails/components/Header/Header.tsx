import React, { FunctionComponent } from 'react';
import {
  Container,
  AuthorAndSupportsWrapper,
  CauseName,
  NameAndShareWrapper,
  ShareButtonContainer,
} from './Header.style';
import AuthorAndSupports from 'components/AuthorAndSupports';
import { InCreationCause, Cause } from 'redux/Cause/types';
import HeaderButtons from '../HeaderButtons';
import { useIntl } from 'react-intl';
import { getIsMobile } from 'services/mobile/mobile';
import { CoalitionsDisplay } from '../CoalitionsDisplay';
import { useCauseUnfollow } from 'redux/Cause/hooks/useCauseFollow';
import { useCauseOwner } from 'redux/Cause/hooks/useCauseOwner';
import ShareButton from 'components/ShareButton';
import MoreOptionsMenu from 'components/MoreOptionsMenu';

interface HeaderProps {
  cause: Cause | InCreationCause;
  onSupport?: () => void;
  isSupporting?: boolean;
}

const Header: FunctionComponent<HeaderProps> = ({ cause, onSupport, isSupporting }) => {
  const isMobile = getIsMobile();
  const intl = useIntl();
  const { loading, unfollowCause } = useCauseUnfollow((cause as Cause).uuid);
  const isCauseOwner = useCauseOwner(cause);

  const shouldDisplayMoreIcon = () =>
    (cause as Cause).uuid !== undefined && cause.supported === true && !isCauseOwner;

  return (
    <Container>
      <div>
        <NameAndShareWrapper>
          <div>
            <CoalitionsDisplay cause={cause} />
            <CauseName>{cause.name}</CauseName>
          </div>
          {isMobile ? (
            <ShareButtonContainer>
              <ShareButton
                displayMobileIcon
                shareContent={{ title: cause.name, text: cause.name }}
              />
            </ShareButtonContainer>
          ) : null}
        </NameAndShareWrapper>
        <AuthorAndSupportsWrapper>
          <AuthorAndSupports cause={cause} showAuthor />
          {shouldDisplayMoreIcon() ? (
            <MoreOptionsMenu
              isUnfollowing={loading}
              unfollow={unfollowCause}
              unfollowModalLabels={{
                description: intl.formatMessage({ id: 'cause.unfollow_modal.description' }),
                confirm: intl.formatMessage({ id: 'cause.unfollow_modal.confirm' }),
              }}
            />
          ) : null}
        </AuthorAndSupportsWrapper>
      </div>
      <HeaderButtons cause={cause} onSupport={onSupport} isSupporting={isSupporting} />
    </Container>
  );
};

export default Header;
