import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { Container } from './DeleteEventButton.style';

export const DeleteEventButton: FunctionComponent = () => {
  const intl = useIntl();

  return (
    <Container size="small" variant="outlined" color="primary">
      {intl.formatMessage({ id: 'event_form.update.cancel_event' })}
    </Container>
  );
};
