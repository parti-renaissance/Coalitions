import { useIntl } from 'react-intl';
import { Coalition } from 'redux/Coalition/types';
import { hasEmoji } from 'services/formik/hasEmoji';

export interface FormValues {
  title?: string;
  description?: string;
  coalitions?: Coalition[];
  image?: string;
}

export interface FormErrors {
  title?: string;
  description?: string;
  coalitions?: string;
  image?: string;
}

export const useValidateForm = () => {
  const intl = useIntl();

  const validateForm = ({ title, description, coalitions, image }: FormValues) => {
    const errors = {} as FormErrors;
    const requiredErrorMessage = intl.formatMessage({ id: 'form_errors.required' });
    const emojiErrorMessage = intl.formatMessage({ id: 'form_errors.emoji-forbidden' });

    if (title === undefined || title.length === 0) {
      errors.title = requiredErrorMessage;
    } else if (hasEmoji(title)) {
      errors.title = emojiErrorMessage;
    }

    if (coalitions === undefined || coalitions.length === 0) {
      errors.coalitions = requiredErrorMessage;
    }

    if (image === undefined) {
      errors.image = requiredErrorMessage;
    }

    if (hasEmoji(description)) {
      errors.description = emojiErrorMessage;
    }

    return errors;
  };

  return { validateForm };
};
