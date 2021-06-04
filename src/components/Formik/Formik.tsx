import React from 'react';
import { Formik as OriginalFormik, FormikErrors, FormikConfig } from 'formik';
import { useIntl } from 'react-intl';
import { hasEmoji } from 'services/formik/hasEmoji';
import { EditorState } from 'draft-js';

export const Formik = <Values,>({ validate, ...restOfProps }: FormikConfig<Values>) => {
  const intl = useIntl();
  const emojiErrorMessage = intl.formatMessage({ id: 'form_errors.emoji-forbidden' });

  const validateWithEmojiCheck = (values?: any) => {
    let errors = {} as FormikErrors<Values>;

    if (values === undefined) {
      return errors;
    }

    if (validate !== undefined) {
      errors = validate(values) as FormikErrors<Values>;
    }

    Object.keys(values).forEach(key => {
      let value = null;

      if (typeof values[key] === 'string') {
        value = values[key];
      } else if (values[key] instanceof EditorState) {
        value = values[key].getCurrentContent().getPlainText();
      }

      if (value !== null && hasEmoji(value)) {
        errors = {
          ...errors,
          [key]: emojiErrorMessage,
        };
      }
    });

    return errors;
  };

  return <OriginalFormik<Values> {...restOfProps} validate={validateWithEmojiCheck} />;
};

export default Formik;
