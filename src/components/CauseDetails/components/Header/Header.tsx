import React, { FunctionComponent } from 'react';
import { Container, CoalitionName, AuthorAndSupportsWrapper, CauseName } from './Header.style';
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
    <HeaderButtons cause={cause} onSupport={onSupport} isSupporting={isSupporting} />
  </Container>
);

export default Header;
