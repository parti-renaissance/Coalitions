import React, { FunctionComponent, useState } from 'react';
import {
  Container,
  AuthorAndSupportsWrapper,
  CauseName,
  MoreIcon,
  MoreIconContainer,
  NameAndShareWrapper,
  ShareButtonContainer,
  ShareButton,
} from './Header.style';
import AuthorAndSupports from 'components/AuthorAndSupports';
import { InCreationCause, Cause } from 'redux/Cause/types';
import HeaderButtons from '../HeaderButtons';
import { getIsMobile } from 'services/mobile/mobile';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { updateSnackbar } from 'redux/Snackbar';
import { Severity } from 'redux/Snackbar/types';
import { CoalitionsDisplay } from '../CoalitionsDisplay';
import { UnfollowModal } from '../UnfollowModal/UnfollowModal';

interface HeaderProps {
  cause: Cause | InCreationCause;
  onSupport?: () => void;
  isSupporting?: boolean;
}

const Header: FunctionComponent<HeaderProps> = ({ cause, onSupport, isSupporting }) => {
  // To fix with a global type definition, once behaviour is validated
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav: any = navigator;
  const isAbleToUseShareApi = nav?.share !== undefined;
  const isMobile = getIsMobile();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const [isUnfollowModalOpened, setIsUnfollowModalOpened] = useState(false);

  const handleShareClick = () => {
    if (isAbleToUseShareApi && isMobile) {
      nav.share({ url: window.location.href, title: cause.name, text: cause.name });
    } else {
      navigator.clipboard.writeText(window.location.href);
      dispatch(
        updateSnackbar({
          message: formatMessage({ id: 'cause.copy-to-clipboard' }),
          severity: Severity.success,
        }),
      );
    }
  };

  return (
    <>
      <Container>
        <div>
          <NameAndShareWrapper>
            <div>
              <CoalitionsDisplay cause={cause} />
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
            {cause.supported === true && (
              <MoreIconContainer>
                <MoreIcon
                  src="/images/more_vertical.svg"
                  onClick={() => {
                    setIsUnfollowModalOpened(true);
                  }}
                />
              </MoreIconContainer>
            )}
          </AuthorAndSupportsWrapper>
        </div>
        <HeaderButtons
          cause={cause}
          onSupport={onSupport}
          isSupporting={isSupporting}
          onShare={handleShareClick}
        />
      </Container>
      <UnfollowModal
        isOpened={isUnfollowModalOpened}
        onClose={() => {
          setIsUnfollowModalOpened(false);
        }}
      />
    </>
  );
};

export default Header;
