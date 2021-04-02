import React, { FunctionComponent } from 'react';
import { Container, Title, Bold } from './LegalPage.style';

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

export { Bold, Title };
