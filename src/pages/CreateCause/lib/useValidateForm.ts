import { useIntl } from 'react-intl';

export interface FormValues {
  title?: string;
  shortDescription?: string;
  description?: string;
}

export const useValidateForm = () => {
  const intl = useIntl();

  const validateForm = ({ title }: FormValues) => {
    const errors = {} as FormValues;
    const requiredErrorMessage = intl.formatMessage({ id: 'form_errors.required' });

    if (title === undefined || title.length === 0) {
      errors.title = requiredErrorMessage;
    }

    return errors;
  };

  return { validateForm };
};
