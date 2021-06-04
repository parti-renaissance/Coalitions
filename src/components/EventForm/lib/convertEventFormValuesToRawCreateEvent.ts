import { formatPickerDateToEventDate } from 'redux/Events/helpers/formatEventDateToPickerDate';
import { RawCreateEventType, RawUpdateEventType } from 'redux/Events/types';
import { EventFormValues } from './useValidateForm';

export const convertEventFormValuesToRawCreateEvent = ({
  values,
  causeId,
  coalitionId,
  eventId,
}: {
  values: EventFormValues;
  causeId?: string;
  coalitionId?: string;
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

  const rawCreateEvent: RawCreateEventType = {
    type: causeId !== undefined ? 'cause' : 'coalition',
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
    time_zone: timeZone,
    begin_at: formatPickerDateToEventDate({ date: beginAt, timeZone }),
    finish_at: formatPickerDateToEventDate({ date: finishAt, timeZone }),
    cause: causeId,
    coalition: causeId === undefined ? coalitionId : undefined,
  };

  if (eventId === undefined) {
    return rawCreateEvent as RawCreateEventType;
  }

  return {
    ...rawCreateEvent,
    uuid: eventId,
  } as RawUpdateEventType;
};
