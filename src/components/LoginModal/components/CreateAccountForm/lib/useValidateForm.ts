import { useIntl } from 'react-intl';
import { isFieldEmpty } from 'services/formik/form';

export interface InscriptionFormValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  cityId?: string;
  cguAgreement?: boolean;
  causeMailAgreement?: boolean;
  coalitionMailAgreement?: boolean;
  dataShareAgreement?: boolean;
}

type ErrorForm = {
  firstName?: string;
  lastName?: string;
  email?: string;
  cityId?: string;
  cguAgreement?: string;
  dataShareAgreement?: string;
};

export const useValidateForm = () => {
  const intl = useIntl();

  // eslint-disable-next-line complexity
  const validateForm = (isInEventFlow?: boolean) => ({
    firstName,
    lastName,
    email,
    cityId,
    cguAgreement,
    dataShareAgreement,
  }: InscriptionFormValues) => {
    const errors = {} as ErrorForm;
    const requiredErrorMessage = intl.formatMessage({ id: 'form_errors.required' });

    if (isFieldEmpty(firstName)) {
      errors.firstName = requiredErrorMessage;
    }

    if (firstName !== undefined && firstName.length < 2) {
      errors.firstName = intl.formatMessage({ id: 'form_errors.too-short' }, { minLength: 2 });
    }

    if (isFieldEmpty(email)) {
      errors.email = requiredErrorMessage;
    } else if (email !== undefined && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = intl.formatMessage({ id: 'form_errors.invalid-email' });
    }

    if (isInEventFlow === true) {
      if (isFieldEmpty(lastName)) {
        errors.lastName = requiredErrorMessage;
      }

      if (lastName !== undefined && lastName.length < 2) {
        errors.lastName = intl.formatMessage({ id: 'form_errors.too-short' }, { minLength: 2 });
      }

      if (dataShareAgreement === undefined || dataShareAgreement === false) {
        errors.dataShareAgreement = requiredErrorMessage;
      }
    } else {
      if (isFieldEmpty(cityId)) {
        errors.cityId = requiredErrorMessage;
      }

      if (cguAgreement === undefined || cguAgreement === false) {
        errors.cguAgreement = requiredErrorMessage;
      }
    }

    return errors;
  };

  return { validateForm };
};
