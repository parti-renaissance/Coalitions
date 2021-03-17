import { useIntl } from 'react-intl';

export interface FormValues {
  title?: string;
  shortDescription?: string;
  description?: string;
  coalitionUuids?: string[];
  image?: string;
}

export interface FormErrors {
  title?: string;
  shortDescription?: string;
  description?: string;
  coalitionUuids?: string;
  image?: string;
}

export const useValidateForm = () => {
  const intl = useIntl();

  const validateForm = ({ title, coalitionUuids, image }: FormValues) => {
    const errors = {} as FormErrors;
    const requiredErrorMessage = intl.formatMessage({ id: 'form_errors.required' });

    if (title === undefined || title.length === 0) {
      errors.title = requiredErrorMessage;
    }

    if (coalitionUuids === undefined || coalitionUuids.length === 0) {
      errors.coalitionUuids = requiredErrorMessage;
    }

    if (image === undefined) {
      errors.image = requiredErrorMessage;
    }

    return errors;
  };

  return { validateForm };
};
