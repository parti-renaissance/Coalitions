import { useIntl } from 'react-intl';

export interface FormValues {
  title?: string;
  shortDescription?: string;
  description?: string;
  coalitionUuids?: string[];
}

export interface FormErrors {
  title?: string;
  shortDescription?: string;
  description?: string;
  coalitionUuids?: string;
}

export const useValidateForm = () => {
  const intl = useIntl();

  const validateForm = ({ title, coalitionUuids }: FormValues) => {
    const errors = {} as FormErrors;
    const requiredErrorMessage = intl.formatMessage({ id: 'form_errors.required' });

    if (title === undefined || title.length === 0) {
      errors.title = requiredErrorMessage;
    }

    if (coalitionUuids === undefined || coalitionUuids.length === 0) {
      errors.coalitionUuids = requiredErrorMessage;
    }

    return errors;
  };

  return { validateForm };
};
