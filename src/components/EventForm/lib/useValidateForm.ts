import { useIntl } from 'react-intl';
import { EventMode } from 'redux/Events/types';
import { format } from 'date-fns';

export interface EventFormValues {
  mode: EventMode;
  name: string;
  beginAt: string;
  finishAt: string;
  description: string;
  address: string;
  postalCode: string;
  countryCode: string;
  cityName: string;
  visioUrl?: string;
}

export interface EventFormErrors {
  name?: string;
  mode?: string;
  address?: string;
  visioUrl?: string;
  beginAt?: string;
  finishAt?: string;
  description?: string;
  cityName?: string;
  postalCode?: string;
  countryCode?: string;
}

export const useValidateForm = () => {
  const intl = useIntl();

  // eslint-disable-next-line complexity
  const validateForm = ({
    name,
    mode,
    address,
    visioUrl,
    beginAt,
    finishAt,
    description,
    cityName,
    postalCode,
    countryCode,
  }: EventFormValues) => {
    const errors = {} as EventFormErrors;
    const requiredErrorMessage = intl.formatMessage({ id: 'form_errors.required' });

    if (name === undefined || name.length < 5) {
      errors.name = intl.formatMessage({ id: 'form_errors.too-short' }, { minLength: 5 });
    }

    if (mode === undefined || mode.length === 0) {
      errors.mode = requiredErrorMessage;
    }

    if (address === undefined || address.length === 0) {
      errors.address = requiredErrorMessage;
    }

    if (cityName === undefined || cityName.length === 0) {
      errors.cityName = requiredErrorMessage;
    }

    if (postalCode === undefined || postalCode.length === 0) {
      errors.postalCode = requiredErrorMessage;
    }

    if (countryCode === undefined || countryCode.length === 0) {
      errors.countryCode = requiredErrorMessage;
    }

    if ((visioUrl === undefined || visioUrl.length === 0) && mode === 'online') {
      errors.visioUrl = requiredErrorMessage;
    }

    if (beginAt === undefined || beginAt.length === 0) {
      errors.beginAt = requiredErrorMessage;
    } else if (finishAt === undefined || finishAt.length === 0) {
      errors.finishAt = requiredErrorMessage;
    } else if (beginAt >= finishAt) {
      const dateRangeErrorMessage = intl.formatMessage({
        id: 'event_form.errors.empty_dates_range',
      });
      errors.finishAt = dateRangeErrorMessage;
    } else {
      const finishAtMinusMaxDuration = new Date(finishAt);
      finishAtMinusMaxDuration.setDate(finishAtMinusMaxDuration.getDate() - 3);
      if (beginAt < format(finishAtMinusMaxDuration, "yyyy-MM-dd'T'HH:mm")) {
        errors.finishAt = intl.formatMessage({
          id: 'event_form.errors.too_long_event',
        });
      }
    }

    if (description === undefined || description.length < 10) {
      errors.description = intl.formatMessage({ id: 'form_errors.too-short' }, { minLength: 10 });
    }

    return errors;
  };

  return { validateForm };
};
