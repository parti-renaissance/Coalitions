import { useIntl } from 'react-intl';

export interface FormValues {
  firstName?: string;
  email?: string;
  cityId?: string;
}

export const useValidateForm = <OtherFormValues>() => {
  const intl = useIntl();

  const validateForm = ({ firstName, email, cityId }: FormValues & OtherFormValues) => {
    const errors = {} as FormValues & OtherFormValues;
    const requiredErrorMessage = intl.formatMessage({ id: 'login_modal.form_errors.required' });

    if (!firstName) {
      errors.firstName = requiredErrorMessage;
    }

    if (!email) {
      errors.email = requiredErrorMessage;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = intl.formatMessage({ id: 'login_modal.form_errors.invalid-email' });
    }

    if (!cityId) {
      errors.cityId = requiredErrorMessage;
    }

    return errors;
  };

  return { validateForm };
};
