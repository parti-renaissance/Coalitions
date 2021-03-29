import { FormValues } from './useValidateForm';
import { Coalition } from 'redux/Coalition/types';
import { InCreationCauseWithoutAuthor } from 'redux/Cause/types';

export const convertCauseToFormValues = (cause: InCreationCauseWithoutAuthor): FormValues => {
  const { coalition, name, description, image_url } = cause;

  return {
    title: name,
    coalitions: [coalition as Coalition],
    image: image_url,
    description,
  };
};
