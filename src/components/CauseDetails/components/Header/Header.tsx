import React, { FunctionComponent, useState } from 'react';
import {
  Container,
  CoalitionName,
  AuthorAndSupportsWrapper,
  CauseName,
  NameAndShareWrapper,
  ShareButtonContainer,
  ShareButton,
} from './Header.style';
import AuthorAndSupports from 'components/AuthorAndSupports';
import { InCreationCause, Cause } from 'redux/Cause/types';
import HeaderButtons from '../HeaderButtons';
import { Menu, MenuItem } from '@material-ui/core';

interface HeaderProps {
  cause: Cause | InCreationCause;
  onSupport?: () => void;
  isSupporting?: boolean;
}

const Header: FunctionComponent<HeaderProps> = ({ cause, onSupport, isSupporting }) => {
  const [openShareMenu, setOpenShareMenu] = useState(false);
  // To fix with a global type definition, once behaviour is validated
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav: any = navigator;
  const isAbleToUseShareApi = nav?.share !== undefined;

  const handleShareClick = () => {
    if (isAbleToUseShareApi) {
      nav.share({ url: window.location.href, title: cause.name, text: cause.name });
    } else {
      setOpenShareMenu(!openShareMenu);
    }
  };

  return (
    <Container>
      <div>
        <NameAndShareWrapper>
          <div>
            {cause.coalition !== undefined && cause.coalition !== null ? (
              <CoalitionName>{cause.coalition.name}</CoalitionName>
            ) : null}
            <CauseName>{cause.name}</CauseName>
          </div>
          <ShareButtonContainer>
            <ShareButton onClick={handleShareClick} src="/images/share.svg" />
            <Menu open={openShareMenu}>
              <MenuItem>
                <a
                  href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(
                    window.location.href,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    window.location.href,
                  )}&text=${cause.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </MenuItem>
            </Menu>
          </ShareButtonContainer>
        </NameAndShareWrapper>
        <AuthorAndSupportsWrapper>
          <AuthorAndSupports cause={cause} showAuthor />
        </AuthorAndSupportsWrapper>
      </div>
      <HeaderButtons cause={cause} onSupport={onSupport} isSupporting={isSupporting} />
    </Container>
  );
};

export default Header;
