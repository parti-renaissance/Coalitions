import { useIntl } from 'react-intl';
import { hasEmoji } from 'services/formik/hasEmoji';

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

const isFieldEmpty = (value: string | undefined) => value === undefined || value.length === 0;

export const useValidateForm = () => {
  const intl = useIntl();

  // eslint-disable-next-line complexity
  const validateForm = ({ firstName, email, cityId, cguAgreement }: InscriptionFormValues) => {
    const errors = {} as ErrorForm;
    const requiredErrorMessage = intl.formatMessage({ id: 'form_errors.required' });
    const emojiErrorMessage = intl.formatMessage({ id: 'form_errors.emoji-forbidden' });

    if (isFieldEmpty(firstName)) {
      errors.firstName = requiredErrorMessage;
    } else if (hasEmoji(firstName)) {
      errors.firstName = emojiErrorMessage;
    }

    if (isFieldEmpty(email)) {
      errors.email = requiredErrorMessage;
    } else if (email !== undefined && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = intl.formatMessage({ id: 'form_errors.invalid-email' });
    } else if (hasEmoji(email)) {
      errors.email = emojiErrorMessage;
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
