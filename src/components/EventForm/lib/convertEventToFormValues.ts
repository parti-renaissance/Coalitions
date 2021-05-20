import { EventFormValues } from './useValidateForm';
import { EventType } from 'redux/Events/types';

export const convertEventToFormValues = (event: EventType): EventFormValues => {
  const { uuid, name, mode, visio_url, begin_at, finish_at, description } = event;

  return {
    uuid,
    name,
    mode,
    address: '',
    link: visio_url,
    beginAtDate: begin_at,
    finishAtDate: finish_at,
    categoryId: '',
    description,
  };
};
