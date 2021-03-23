import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { CauseContainer, Definition, Title } from './Definition.style';

export const CauseDefinition: FunctionComponent = () => {
  const intl = useIntl();
  return (
    <CauseContainer>
      <Title>{intl.formatMessage({ id: 'cause.what-is-it' })}</Title>
      <Definition>{intl.formatMessage({ id: 'cause.definition' })}</Definition>
    </CauseContainer>
  );
};
