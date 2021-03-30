import React, { FunctionComponent } from 'react';
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
import { getIsMobile } from 'services/mobile/mobile';
import HeaderButtons from '../HeaderButtons';

interface HeaderProps {
  cause: Cause | InCreationCause;
  onSupport?: () => void;
  isSupporting?: boolean;
}

const Header: FunctionComponent<HeaderProps> = ({ cause, onSupport, isSupporting }) => {
  let nav: any;
  nav = navigator;
  const isMobile = getIsMobile();
  const isAbleToUseShareApi = nav?.share !== undefined;

  const handleShareClick = () => {
    if (isAbleToUseShareApi) {
      nav.share({ url: window.location.href, title: cause.name, text: cause.name });
    } else {
    }
  };

  return (
    <Container>
      <div>
        <NameAndShareWrapper>
          <div>
            {cause.coalition !== undefined ? (
              <CoalitionName>{cause.coalition.name}</CoalitionName>
            ) : null}
            <CauseName>{cause.name}</CauseName>
          </div>
          {isMobile && (
            <ShareButtonContainer>
              <ShareButton onClick={handleShareClick} src="/images/share.svg" />
            </ShareButtonContainer>
          )}
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
