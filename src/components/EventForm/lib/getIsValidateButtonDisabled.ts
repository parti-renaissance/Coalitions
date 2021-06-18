import { FormikErrors, FormikTouched } from 'formik';
import isMatch from 'lodash/isMatch';
import { EventFormValues } from './useValidateForm';

// eslint-disable-next-line complexity
export const getIsValidateButtonDisabled = ({
  errors,
  touched,
  initialValues,
  isUpdating,
  values,
}: {
  errors: FormikErrors<EventFormValues>;
  touched: FormikTouched<EventFormValues>;
  initialValues: EventFormValues;
  isUpdating: boolean;
  values: EventFormValues;
}): boolean => {
  if (isUpdating) {
    return Object.keys(errors).length > 0 || isMatch(values, initialValues);
  } else {
    return (
      Object.keys(errors).length > 0 ||
      touched.name !== true ||
      touched.address !== true ||
      (values.mode === 'online' && touched.visioUrl !== true) ||
      touched.beginAt !== true ||
      touched.finishAt !== true ||
      touched.description !== true ||
      touched.cityName !== true ||
      touched.postalCode !== true
    );
  }
};
