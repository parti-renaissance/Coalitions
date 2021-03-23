import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { CoalitionContainer, Definition, Title } from './Definition.style';

export const CoalitionDefinition: FunctionComponent = () => {
  const intl = useIntl();
  return (
    <CoalitionContainer>
      <Title>{intl.formatMessage({ id: 'coalition.what-is-it' })}</Title>
      <Definition>{intl.formatMessage({ id: 'coalition.definition' })}</Definition>
    </CoalitionContainer>
  );
};
