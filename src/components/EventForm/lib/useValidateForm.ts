import { useIntl } from 'react-intl';
import { CreateEventType, UpdatedEventType } from 'redux/Events/types';

export interface EventFormErrors {
  uuid?: string;
  name?: string;
  mode?: string;
  address?: string;
  visioUrl?: string;
  beginAt?: string;
  finishAt?: string;
  categoryId?: string;
  description?: string;
  causeId?: string;
}

export const useValidateForm = () => {
  const intl = useIntl();

  // eslint-disable-next-line complexity
  const validateForm = ({
    name,
    mode,
    address,
    visioUrl,
    beginAt,
    finishAt,
    categoryId,
    description,
  }: CreateEventType | UpdatedEventType) => {
    const errors = {} as EventFormErrors;
    const requiredErrorMessage = intl.formatMessage({ id: 'form_errors.required' });

    if (name === undefined || name.length === 0) {
      errors.name = requiredErrorMessage;
    }

    if (mode === undefined || mode.length === 0) {
      errors.mode = requiredErrorMessage;
    }

    if (address === undefined || address.length === 0) {
      errors.address = requiredErrorMessage;
    }

    if ((visioUrl === undefined || visioUrl.length === 0) && mode === 'online') {
      errors.visioUrl = requiredErrorMessage;
    }

    if (beginAt === undefined) {
      errors.beginAt = requiredErrorMessage;
    }

    if (finishAt === undefined) {
      errors.finishAt = requiredErrorMessage;
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
