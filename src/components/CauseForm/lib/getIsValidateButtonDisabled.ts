import { FormikErrors, FormikTouched } from 'formik';
import { FormValues } from './useValidateForm';
import isMatch from 'lodash/isMatch';

export const getIsValidateButtonDisabled = ({
  errors,
  touched,
  initialValues,
  isAPublishedCause,
  values,
}: {
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  initialValues: FormValues;
  isAPublishedCause: boolean;
  values: FormValues;
}): boolean => {
  if (isAPublishedCause) {
    return Object.keys(errors).length > 0 || isMatch(values, initialValues);
  } else {
    return (
      Object.keys(errors).length > 0 ||
      (initialValues.title === undefined && touched.title !== true)
    );
  }
};
