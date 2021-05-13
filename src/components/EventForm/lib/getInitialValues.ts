import { EventType, InCreationEventType } from 'redux/Events/types';

export const getInitialValues = (event?: EventType): InCreationEventType => {
  if (event !== undefined) {
    return event;
  }

  return {
    begin_at: '',
    finish_at: '',
    category: {
      event_group_category: {
        name: '',
      },
    },
    mode: 'meeting',
    name: '',
    time_zone: 'Europe/Paris',
  };
};
