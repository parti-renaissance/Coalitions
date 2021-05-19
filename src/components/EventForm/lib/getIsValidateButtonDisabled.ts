import { FormikErrors, FormikTouched } from 'formik';
import { EventFormValues } from './useValidateForm';
import isMatch from 'lodash/isMatch';

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
      (values.mode === 'meeting' && touched.address !== true) ||
      (values.mode === 'online' && touched.link !== true) ||
      touched.beginAtDate !== true ||
      touched.finishAtDate !== true ||
      touched.categoryId !== true ||
      touched.description !== true
    );
  }
};
