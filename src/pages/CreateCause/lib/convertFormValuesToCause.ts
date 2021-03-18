import { FormValues } from './useValidateForm';
import { Coalition } from 'redux/Coalition/types';
import { InCreationCause } from 'redux/Cause/types';

export const convertFormValuesToCause = (values: FormValues): InCreationCause => ({
  name: values.title as string,
  image_url: values.image as string,
  description: `${values.shortDescription} ${values.description}`,
  followers_count: 1,
  supported: true,
  coalition: (values.coalitions as Coalition[])[0],
  author: {
    first_name: '',
    last_name_initial: '',
    uuid: '',
  },
});
