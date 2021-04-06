import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { CHARTER_OF_VALUES_URL } from 'routes';
import { CauseContainer, Definition, Title } from './Definition.style';

export const CauseDefinition: FunctionComponent = () => {
  return (
    <CauseContainer>
      <Title>
        <FormattedMessage id="cause.what-is-it" />
      </Title>
      <Definition>
        <FormattedMessage
          id="cause.definition"
          values={{
            charteValue: (
              <a href={CHARTER_OF_VALUES_URL} target="_blank" rel="noopener noreferrer">
                <FormattedMessage id="cause.charte-value" />
              </a>
            ),
          }}
        />
      </Definition>
    </CauseContainer>
  );
};
