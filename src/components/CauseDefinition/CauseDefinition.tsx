import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { Container, Definition } from './CauseDefinition.style';

const CauseDefinition: FunctionComponent = () => {
  const intl = useIntl();
  return (
    <Container>
      <h1>{intl.formatMessage({ id: 'cause.what-is-it' })}</h1>
      <Definition>{intl.formatMessage({ id: 'cause.definition' })}</Definition>
    </Container>
  );
};

export default CauseDefinition;
