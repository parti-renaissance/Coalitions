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
      categorySlug: '',
      description: '',
      causeId,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      postalCode: '',
      cityName: '',
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
    categorySlug: category.slug,
    description,
    causeId: initialEventCauseId,
    timeZone,
    address: postAddress !== undefined ? postAddress.address : '',
    postalCode: postAddress !== undefined ? postAddress.postalCode : '',
    cityName: postAddress !== undefined ? postAddress.city.name : '',
    countryId: postAddress !== undefined ? postAddress.country.id : '',
  };
};
