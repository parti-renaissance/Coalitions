import { EventType } from 'redux/Events/types';
import { formatEventDateToPickerDate } from 'redux/Events/helpers/formatEventDateToPickerDate';
import { EventFormValues } from './useValidateForm';

export const getInitialValues = (initialEvent?: EventType): EventFormValues => {
  if (initialEvent === undefined) {
    return {
      name: '',
      mode: 'meeting',
      address: '',
      visioUrl: '',
      beginAt: '',
      finishAt: '',
      description: '',
      postalCode: '',
      cityName: '',
      countryCode: 'FR',
    };
  }

  const {
    name,
    mode,
    visioUrl,
    beginAt,
    finishAt,
    description,
    postAddress,
    timeZone,
  } = initialEvent;

  return {
    name,
    mode,
    visioUrl,
    beginAt: formatEventDateToPickerDate({ date: beginAt, timeZone }),
    finishAt: formatEventDateToPickerDate({ date: finishAt, timeZone }),
    description,
    address: postAddress !== undefined ? postAddress.address : '',
    postalCode: postAddress !== undefined ? postAddress.postalCode : '',
    cityName: postAddress !== undefined ? postAddress.cityName : '',
    countryCode: postAddress !== undefined ? postAddress.countryCode : '',
  };
};
