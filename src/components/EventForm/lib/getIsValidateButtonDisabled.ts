import { FormikErrors, FormikTouched } from 'formik';
import isMatch from 'lodash/isMatch';
import { CreateEventType, UpdatedEventType } from 'redux/Events/types';

// eslint-disable-next-line complexity
export const getIsValidateButtonDisabled = ({
  errors,
  touched,
  initialValues,
  isUpdating,
  values,
}: {
  errors: FormikErrors<CreateEventType | UpdatedEventType>;
  touched: FormikTouched<CreateEventType | UpdatedEventType>;
  initialValues: CreateEventType | UpdatedEventType;
  isUpdating: boolean;
  values: CreateEventType | UpdatedEventType;
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
      touched.categoryId !== true ||
      touched.description !== true
    );
  }
};
