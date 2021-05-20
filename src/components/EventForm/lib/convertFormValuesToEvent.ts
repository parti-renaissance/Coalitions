import { EventFormValues } from './useValidateForm';
import { InCreationEventType, EventType, EventMode } from 'redux/Events/types';

export const convertFormValuesToEvent = (
  formValues: EventFormValues,
): InCreationEventType | EventType => {
  const { uuid, name, mode, link, beginAtDate, finishAtDate, description } = formValues;

  return {
    uuid: uuid as string,
    name: name as string,
    begin_at: beginAtDate as string,
    finish_at: finishAtDate as string,
    time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    mode: mode as EventMode,
    description: description as EventMode,
    visio_url: link as string,
    category: {
      name: '',
    },
  };
};
