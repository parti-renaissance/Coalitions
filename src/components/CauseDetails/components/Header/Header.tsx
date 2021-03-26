import React, { FunctionComponent } from 'react';
import {
  Container,
  CoalitionName,
  AuthorAndSupportsWrapper,
  CauseName,
  DesktopButtonsContainer,
} from './Header.style';
import AuthorAndSupports from 'components/AuthorAndSupports';
import { InCreationCause, Cause } from 'redux/Cause/types';
import HeaderButtons from '../HeaderButtons';

interface HeaderProps {
  cause: Cause | InCreationCause;
  onSupport?: () => void;
  isSupporting?: boolean;
}

const Header: FunctionComponent<HeaderProps> = ({ cause, onSupport, isSupporting }) => (
  <Container>
    <div>
      <CoalitionName>{cause.coalition.name}</CoalitionName>
      <CauseName>{cause.name}</CauseName>
      <AuthorAndSupportsWrapper>
        <AuthorAndSupports cause={cause} showAuthor />
      </AuthorAndSupportsWrapper>
    </div>
    <DesktopButtonsContainer>
      <HeaderButtons cause={cause} onSupport={onSupport} isSupporting={isSupporting} />
    </DesktopButtonsContainer>
  </Container>
);

export default Header;
