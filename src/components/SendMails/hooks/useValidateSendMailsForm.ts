import { EditorState } from 'draft-js';
import { useIntl } from 'react-intl';
import { isFieldEmpty } from 'services/formik/form';

export type SendMailForm = {
  object: string;
  body: EditorState;
};

export type SendMailFormError = {
  object: string;
  body: string;
};

export const useValidateSendMailsForm = () => {
  const { formatMessage } = useIntl();

  // eslint-disable-next-line complexity
  const validateForm = ({ object, body }: SendMailForm) => {
    const requiredErrorMessage = formatMessage({ id: 'form_errors.required' });
    const errors = {} as SendMailFormError;

    if (isFieldEmpty(object)) {
      errors.object = requiredErrorMessage;
    }
    if (object !== undefined && object.length < 3) {
      errors.object = formatMessage({ id: 'send_mails.form_errors.too-short-object' });
    }
    if (object !== undefined && object.length > 100) {
      errors.object = formatMessage({ id: 'send_mails.form_errors.too-long-object' });
    }

    if (body === undefined) {
      errors.body = requiredErrorMessage;
    } else {
      const currentBody = body.getCurrentContent();

      if (!currentBody.hasText()) {
        errors.body = requiredErrorMessage;
      }
      if (currentBody.getPlainText().length < 3) {
        errors.body = formatMessage({ id: 'send_mails.form_errors.too-short-body' });
      }
      if (currentBody.getPlainText().length > 6000) {
        errors.body = formatMessage({ id: 'send_mails.form_errors.too-long-body' });
      }
    }

    return errors;
  };

  return { validateForm };
};
