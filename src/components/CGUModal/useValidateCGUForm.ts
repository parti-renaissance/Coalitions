import { useIntl } from 'react-intl';
import { CGUFormValues } from './CGUModal';

type ErrorForm = {
  cguAgreement?: string;
};

export const useValidateForm = () => {
  const intl = useIntl();

  const validateForm = ({ cguAgreement }: CGUFormValues) => {
    const errors = {} as ErrorForm;
    const requiredErrorMessage = intl.formatMessage({ id: 'form_errors.required' });

    if (cguAgreement === undefined || cguAgreement === false) {
      errors.cguAgreement = requiredErrorMessage;
    }
    return errors;
  };

  return { validateForm };
};
