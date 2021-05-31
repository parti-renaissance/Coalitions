import { CreateEventType, EventType, UpdatedEventType } from 'redux/Events/types';
import { formatEventDateToPickerDate } from 'redux/Events/helpers/formatEventDateToPickerDate';

export const getInitialValues = ({
  causeId,
  initialEvent,
}: {
  causeId: string;
  initialEvent?: EventType;
}): CreateEventType | UpdatedEventType => {
  if (initialEvent === undefined) {
    return {
      name: '',
      mode: 'meeting',
      address: '',
      visioUrl: '',
      beginAt: '',
      finishAt: '',
      categoryId: '',
      description: '',
      causeId,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      postalCode: '',
      cityId: '',
      countryId: '',
    };
  }

  const {
    uuid,
    name,
    mode,
    visioUrl,
    beginAt,
    finishAt,
    description,
    category,
    causeId: initialEventCauseId,
    timeZone,
    postAddress,
  } = initialEvent;

  return {
    uuid,
    name,
    mode,
    visioUrl,
    beginAt: formatEventDateToPickerDate({ date: beginAt, timeZone }),
    finishAt: formatEventDateToPickerDate({ date: finishAt, timeZone }),
    categoryId: category.uuid,
    description,
    causeId: initialEventCauseId,
    timeZone,
    address: postAddress !== undefined ? postAddress.address : '',
    postalCode: postAddress !== undefined ? postAddress.postalCode : '',
    cityId: postAddress !== undefined ? postAddress.city.id : '',
    countryId: postAddress !== undefined ? postAddress.country.id : '',
  };
};
