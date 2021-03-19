import React, { FunctionComponent } from 'react';
import {
  CauseName,
  CoalitionName,
  Container,
  AuthorAndSupportsWrapper,
  MobileSupportButtonWrapper,
  DesktopSupportButton,
} from './Header.style';
import { useIntl } from 'react-intl';
import AuthorAndSupports from 'components/AuthorAndSupports';
import FixedBottomButton from 'components/FixedBottomButton';
import { InCreationCause, Cause } from 'redux/Cause/types';

interface HeaderProps {
  cause: Cause | InCreationCause;
  onSupport?: () => void;
  isSupporting?: boolean;
}

const Header: FunctionComponent<HeaderProps> = ({ cause, onSupport, isSupporting }) => {
  const isPreview = Boolean(!onSupport);
  const isSupported = Boolean(cause.supported);
  const intl = useIntl();

  return (
    <>
      <Container>
        <div>
          <CoalitionName>{cause.coalition.name}</CoalitionName>
          <CauseName>{cause.name}</CauseName>
          <AuthorAndSupportsWrapper>
            <AuthorAndSupports cause={cause} showAuthor />
          </AuthorAndSupportsWrapper>
        </div>
        {!isPreview && !isSupported ? (
          <DesktopSupportButton
            size="small"
            variant="contained"
            color="primary"
            onClick={onSupport}
            isLoading={isSupporting}
          >
            {intl.formatMessage({ id: 'cause.support-button' })}
          </DesktopSupportButton>
        ) : null}
      </Container>
      {!isPreview && !isSupported ? (
        <MobileSupportButtonWrapper>
          <FixedBottomButton onClick={onSupport} isLoading={isSupporting}>
            {intl.formatMessage({ id: 'cause.support-button' })}
          </FixedBottomButton>
        </MobileSupportButtonWrapper>
      ) : null}
    </>
  );
};

export default Header;
