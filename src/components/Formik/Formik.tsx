import React from 'react';
import { Formik as OriginalFormik, FormikErrors, FormikConfig } from 'formik';
import { useIntl } from 'react-intl';
import { hasEmoji } from 'services/formik/hasEmoji';

const Formik = <Values,>({ validate, ...restOfProps }: FormikConfig<Values>) => {
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
      if (typeof values[key] === 'string' && hasEmoji(values[key])) {
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
