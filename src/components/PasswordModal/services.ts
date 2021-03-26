import { useIntl } from 'react-intl';
import { PasswordForm } from './PasswordModal';

export const useValidatePasswordForm = () => {
  const intl = useIntl();

  const validateForm = ({ password, passwordConfirmation }: PasswordForm) => {
    const errors = {} as PasswordForm;
    const requiredErrorMessage = intl.formatMessage({ id: 'form_errors.required' });

    if (password === undefined || password.length === 0) {
      errors.password = requiredErrorMessage;
    }

    if (password !== undefined && password.length < 8) {
      errors.password = intl.formatMessage({ id: 'form_errors.not-long-enough-password' });
    }

    if (passwordConfirmation === undefined || passwordConfirmation.length === 0) {
      errors.passwordConfirmation = requiredErrorMessage;
    }

    if (password !== passwordConfirmation) {
      errors.passwordConfirmation = intl.formatMessage({ id: 'form_errors.unmatched-password' });
    }

    return errors;
  };

  return { validateForm };
};
