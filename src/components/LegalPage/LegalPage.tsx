import React, { FunctionComponent } from 'react';
import { Container, Title } from './LegalPage.style';

interface LegalPageProps {
  title: string;
}

const LegalPage: FunctionComponent<LegalPageProps> = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    {children}
  </Container>
);

export default LegalPage;
