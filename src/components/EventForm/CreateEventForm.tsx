import React, { FunctionComponent } from 'react';
import EventForm from './EventForm';

export const CreateEventForm: FunctionComponent = () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return <EventForm onSubmit={() => {}} isSubmitting={false} />;
};
