import { FormValues } from './useValidateForm';
import { Coalition } from 'redux/Coalition/types';
import { Cause, InCreationCause } from 'redux/Cause/types';

export const convertCauseToFormValues = (
  cause: Cause | InCreationCause | undefined,
): FormValues => {
  if (cause === undefined) {
    return {} as FormValues;
  }

  const { coalition, name, description, image_url } = cause;

  return {
    uuid: (cause as Cause).uuid,
    title: name,
    coalitions: [coalition as Coalition],
    image: image_url,
    description,
  };
};
