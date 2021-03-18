import { useIntl } from 'react-intl';
import { Coalition } from 'redux/Coalition/types';

export interface FormValues {
  title?: string;
  shortDescription?: string;
  description?: string;
  coalitions?: Coalition[];
  image?: string;
}

export interface FormErrors {
  title?: string;
  shortDescription?: string;
  description?: string;
  coalitions?: string;
  image?: string;
}

export const useValidateForm = () => {
  const intl = useIntl();

  const validateForm = ({ title, coalitions, image }: FormValues) => {
    const errors = {} as FormErrors;
    const requiredErrorMessage = intl.formatMessage({ id: 'form_errors.required' });

    if (title === undefined || title.length === 0) {
      errors.title = requiredErrorMessage;
    }

    if (coalitions === undefined || coalitions.length === 0) {
      errors.coalitions = requiredErrorMessage;
    }

    if (image === undefined) {
      errors.image = requiredErrorMessage;
    }

    return errors;
  };

  return { validateForm };
};
