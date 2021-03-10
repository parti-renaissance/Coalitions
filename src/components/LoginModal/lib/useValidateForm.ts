import { useIntl } from 'react-intl';

export interface FORM_VALUES {
  firstName?: string;
  email?: string;
  city?: string;
}

export const useValidateForm = () => {
  const intl = useIntl();

  const validateForm = ({ firstName, email, city }: FORM_VALUES) => {
    const errors: FORM_VALUES = {};
    const requiredErrorMessage = intl.formatMessage({ id: 'login_modal.form_errors.required' });

    if (!firstName) {
      errors.firstName = requiredErrorMessage;
    }

    if (!email) {
      errors.email = requiredErrorMessage;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = intl.formatMessage({ id: 'login_modal.form_errors.invalid-email' });
    }

    if (!city) {
      errors.city = requiredErrorMessage;
    }

    return errors;
  };

  return { validateForm };
};
