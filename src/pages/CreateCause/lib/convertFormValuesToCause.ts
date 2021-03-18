import { FormValues } from './useValidateForm';
import { Coalition } from 'redux/Coalition/types';
import { InCreationCause } from 'redux/Cause/types';
import { User } from 'redux/User/types';

export const convertFormValuesToCause = ({
  formValues,
  currentUser,
}: {
  formValues: FormValues;
  currentUser: User;
}): InCreationCause => ({
  name: formValues.title as string,
  image_url: formValues.image as string,
  description: `${formValues.shortDescription} ${formValues.description}`,
  followers_count: 1,
  supported: true,
  coalition: (formValues.coalitions as Coalition[])[0],
  author: {
    first_name: currentUser.firstName,
    last_name_initial: '',
    uuid: currentUser.uuid,
  },
});
