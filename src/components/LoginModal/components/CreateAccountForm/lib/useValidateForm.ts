import { useIntl } from 'react-intl';

export interface FormValues {
  firstName?: string;
  email?: string;
  cityId?: string;
  cguAgreement?: boolean;
  causeMailAgreement?: boolean;
  coalitionMailAgreement?: boolean;
}

type ErrorForm = {
  firstName?: string;
  email?: string;
  cityId?: string;
  cguAgreement?: string;
};

const isFieldEmpty = (value: string | undefined) => value === undefined || value.length === 0;

export const useValidateForm = () => {
  const intl = useIntl();

  const validateForm = ({ firstName, email, cityId, cguAgreement }: FormValues) => {
    const errors = {} as ErrorForm;
    const requiredErrorMessage = intl.formatMessage({ id: 'form_errors.required' });

    if (isFieldEmpty(firstName)) {
      errors.firstName = requiredErrorMessage;
    }

    if (isFieldEmpty(email)) {
      errors.email = requiredErrorMessage;
    } else if (email !== undefined && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = intl.formatMessage({ id: 'form_errors.invalid-email' });
    }

    if (isFieldEmpty(cityId)) {
      errors.cityId = requiredErrorMessage;
    }

    if (cguAgreement === undefined || cguAgreement === false) {
      errors.cguAgreement = requiredErrorMessage;
    }

    return errors;
  };

  return { validateForm };
};
