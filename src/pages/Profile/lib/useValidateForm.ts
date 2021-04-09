import { useIntl } from 'react-intl';

export interface ProfileFormValues {
  firstName?: string;
  email?: string;
  cityId?: string;
}

type ErrorForm = {
  firstName?: string;
  email?: string;
  cityId?: string;
};

const isFieldEmpty = (value: string | undefined) => value === undefined || value.length === 0;

export const useValidateForm = () => {
  const intl = useIntl();

  const validateForm = ({ firstName, cityId }: ProfileFormValues) => {
    const errors = {} as ErrorForm;
    const requiredErrorMessage = intl.formatMessage({ id: 'form_errors.required' });

    if (isFieldEmpty(firstName)) {
      errors.firstName = requiredErrorMessage;
    }

    if (firstName !== undefined && firstName.length < 2) {
      errors.firstName = intl.formatMessage({ id: 'form_errors.too-short-name' });
    }

    if (isFieldEmpty(cityId)) {
      errors.cityId = requiredErrorMessage;
    }

    return errors;
  };

  return { validateForm };
};
