import React, { FunctionComponent, useState, MouseEvent } from 'react';
import {
  Container,
  AuthorAndSupportsWrapper,
  CauseName,
  MoreIcon,
  MoreIconContainer,
  MoreOptionsMenu,
  NameAndShareWrapper,
  ShareButtonContainer,
} from './Header.style';
import AuthorAndSupports from 'components/AuthorAndSupports';
import { InCreationCause, Cause } from 'redux/Cause/types';
import HeaderButtons from '../HeaderButtons';
import { FormattedMessage } from 'react-intl';
import { getIsMobile } from 'services/mobile/mobile';
import { CoalitionsDisplay } from '../CoalitionsDisplay';
import { UnfollowModal } from '../UnfollowModal/UnfollowModal';
import { useCauseUnfollow } from 'redux/Cause/hooks/useCauseFollow';
import { useCauseOwner } from 'redux/Cause/hooks/useCauseOwner';
import { MenuItem } from '@material-ui/core';
import ShareButton from 'components/ShareButton';

interface HeaderProps {
  cause: Cause | InCreationCause;
  onSupport?: () => void;
  isSupporting?: boolean;
}

const Header: FunctionComponent<HeaderProps> = ({ cause, onSupport, isSupporting }) => {
  const isMobile = getIsMobile();
  const [isUnfollowModalOpened, setIsUnfollowModalOpened] = useState(false);
  const { loading, unfollowCause } = useCauseUnfollow((cause as Cause).uuid);
  const isCauseOwner = useCauseOwner(cause);
  const [moreOptionsMenu, setMoreOptionsMenu] = useState<null | HTMLDivElement>(null);

  const showMoreOptionsMenu = (event: MouseEvent<HTMLDivElement>) => {
    setMoreOptionsMenu(event.currentTarget);
  };

  const closeMoreOptionsMenu = () => {
    setMoreOptionsMenu(null);
  };

  const shouldDisplayMoreIcon = () =>
    (cause as Cause).uuid !== undefined && cause.supported === true && !isCauseOwner;

  return (
    <>
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
              <>
                <MoreIconContainer onClick={showMoreOptionsMenu}>
                  <MoreIcon src="/images/more_vertical.svg" />
                </MoreIconContainer>
                <MoreOptionsMenu
                  anchorEl={moreOptionsMenu}
                  keepMounted
                  open={Boolean(moreOptionsMenu)}
                  onClose={closeMoreOptionsMenu}
                >
                  <MenuItem
                    onClick={() => {
                      setIsUnfollowModalOpened(true);
                      closeMoreOptionsMenu();
                    }}
                  >
                    <FormattedMessage id="cause.more-options.unfollow" />
                  </MenuItem>
                </MoreOptionsMenu>
              </>
            ) : null}
          </AuthorAndSupportsWrapper>
        </div>
        <HeaderButtons cause={cause} onSupport={onSupport} isSupporting={isSupporting} />
      </Container>
      <UnfollowModal
        isOpened={isUnfollowModalOpened}
        onClose={() => {
          setIsUnfollowModalOpened(false);
        }}
        loading={loading}
        unfollowCause={unfollowCause}
      />
    </>
  );
};

export default Header;
