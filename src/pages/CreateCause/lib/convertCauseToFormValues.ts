import { FormValues } from './useValidateForm';
import { Coalition } from 'redux/Coalition/types';
import { InCreationCauseWithoutAuthor } from 'redux/Cause/types';

export const convertCauseToFormValues = (cause: InCreationCauseWithoutAuthor): FormValues => {
  const { coalition, name, description, image_url } = cause;

  const splittedDescription = description.split('\n\n');
  const formattedShortDescription = splittedDescription.length > 0 ? splittedDescription[0] : '';
  splittedDescription.shift();
  const formattedDescription =
    splittedDescription.length > 0 ? splittedDescription.join('\n\n') : '';

  return {
    title: name,
    coalitions: [coalition as Coalition],
    image: image_url,
    shortDescription: formattedShortDescription,
    description: formattedDescription,
  };
};
