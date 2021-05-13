import React, { FunctionComponent } from 'react';
import EventForm from './EventForm';

export const CreateEventForm: FunctionComponent = () => {
  return <EventForm onSubmit={() => {}} isSubmitting={false} />;
};
