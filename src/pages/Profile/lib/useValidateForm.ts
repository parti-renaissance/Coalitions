import { useIntl } from 'react-intl';

export const GENDERS: { labelKey: string; value: string; isPlaceholder?: boolean }[] = [
  { labelKey: 'profile.gender.placeholder', value: 'none', isPlaceholder: true },
  { labelKey: 'profile.gender.male', value: 'male' },
  { labelKey: 'profile.gender.female', value: 'female' },
];

export interface ProfileFormValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  cityId?: string;
  phoneNumber?: string;
  gender?: string;
  birthday?: string;
}

type ErrorForm = {
  firstName?: string;
  lastName?: string;
  email?: string;
  cityId?: string;
  phoneNumber?: string;
  gender?: string;
  birthday?: string;
};

const isFieldEmpty = (value: string | undefined) => value === undefined || value.length === 0;

export const useValidateForm = () => {
  const intl = useIntl();

  const validateForm = ({ firstName, cityId }: ProfileFormValues) => {
    const errors = {} as ErrorForm;
    const requiredErrorMessage = intl.formatMessage({ id: 'form_errors.required' });

    if (isFieldEmpty(firstName)) {
      errors.firstName = requiredErrorMessage;
    }

    if (firstName !== undefined && firstName.length < 2) {
      errors.firstName = intl.formatMessage({ id: 'form_errors.too-short-name' });
    }

    if (isFieldEmpty(cityId)) {
      errors.cityId = requiredErrorMessage;
    }

    return errors;
  };

  return { validateForm };
};
