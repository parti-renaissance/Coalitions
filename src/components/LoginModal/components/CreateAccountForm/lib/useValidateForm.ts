import { useIntl } from 'react-intl';
import { isFieldEmpty } from 'services/formik/form';

export interface InscriptionFormValues {
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

export const useValidateForm = () => {
  const intl = useIntl();

  // eslint-disable-next-line complexity
  const validateForm = ({ firstName, email, cityId, cguAgreement }: InscriptionFormValues) => {
    const errors = {} as ErrorForm;
    const requiredErrorMessage = intl.formatMessage({ id: 'form_errors.required' });

    if (isFieldEmpty(firstName)) {
      errors.firstName = requiredErrorMessage;
    }

    if (firstName !== undefined && firstName.length < 2) {
      errors.firstName = intl.formatMessage({ id: 'form_errors.too-short-name' });
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
