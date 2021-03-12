import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { Container, Title, Definition } from './CauseDefinition.style';

const CauseDefinition: FunctionComponent = () => {
  const intl = useIntl();
  return (
    <Container>
      <Title>{intl.formatMessage({ id: 'cause.what-is-it' })}</Title>
      <Definition>{intl.formatMessage({ id: 'cause.definition' })}</Definition>
    </Container>
  );
};

export default CauseDefinition;
