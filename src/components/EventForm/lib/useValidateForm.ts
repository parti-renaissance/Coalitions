import { useIntl } from 'react-intl';
import { EventMode } from 'redux/Events/types';

export interface EventFormValues {
  uuid?: string;
  name?: string;
  mode: EventMode;
  address?: string;
  link?: string;
  beginAtDate?: string;
  finishAtDate?: string;
  categoryId?: string;
  description?: string;
}

export interface EventFormErrors {
  uuid?: string;
  name?: string;
  mode?: string;
  address?: string;
  link?: string;
  beginAtDate?: string;
  finishAtDate?: string;
  categoryId?: string;
  description?: string;
}

export const useValidateForm = () => {
  const intl = useIntl();

  // eslint-disable-next-line complexity
  const validateForm = ({
    name,
    mode,
    address,
    link,
    beginAtDate,
    finishAtDate,
    categoryId,
    description,
  }: EventFormValues) => {
    const errors = {} as EventFormErrors;
    const requiredErrorMessage = intl.formatMessage({ id: 'form_errors.required' });

    if (name === undefined || name.length === 0) {
      errors.name = requiredErrorMessage;
    }

    if (mode === undefined || mode.length === 0) {
      errors.mode = requiredErrorMessage;
    }

    if ((address === undefined || address.length === 0) && mode === 'meeting') {
      errors.address = requiredErrorMessage;
    }

    if ((link === undefined || link.length === 0) && mode === 'online') {
      errors.link = requiredErrorMessage;
    }

    if (beginAtDate === undefined) {
      errors.beginAtDate = requiredErrorMessage;
    }

    if (finishAtDate === undefined) {
      errors.finishAtDate = requiredErrorMessage;
    }

    if (categoryId === undefined || categoryId.length === 0) {
      errors.categoryId = requiredErrorMessage;
    }

    if (description === undefined || description.length === 0) {
      errors.description = requiredErrorMessage;
    }

    return errors;
  };

  return { validateForm };
};
