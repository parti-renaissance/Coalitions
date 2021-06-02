import { formatPickerDateToEventDate } from 'redux/Events/helpers/formatEventDateToPickerDate';
import { RawCreateEventType, RawUpdateEventType } from 'redux/Events/types';
import { EventFormValues } from './useValidateForm';

export const convertEventFormValuesToRawCreateEvent = ({
  values,
  causeId,
  eventId,
}: {
  values: EventFormValues;
  causeId: string;
  eventId?: string;
}): RawCreateEventType | RawUpdateEventType => {
  const {
    mode,
    name,
    beginAt,
    finishAt,
    categorySlug,
    description,
    address,
    postalCode,
    countryCode,
    cityName,
    visioUrl,
  } = values;

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const rawCreateEvent = {
    type: 'cause',
    mode,
    name,
    description,
    category: categorySlug,
    post_address: {
      address,
      postal_code: postalCode.toString(),
      country: countryCode,
      city_name: cityName,
    },
    visio_url: visioUrl,
    causes: [causeId],
    time_zone: timeZone,
    begin_at: formatPickerDateToEventDate({ date: beginAt, timeZone }),
    finish_at: formatPickerDateToEventDate({ date: finishAt, timeZone }),
  };

  if (eventId === undefined) {
    return rawCreateEvent as RawCreateEventType;
  }

  return {
    ...rawCreateEvent,
    uuid: eventId,
  } as RawUpdateEventType;
};
