import { EventType, RawEventType } from '../types';

export const adaptEvent = (rawEvent: RawEventType): EventType => {
  const {
    uuid,
    mode,
    name,
    begin_at,
    finish_at,
    category,
    time_zone,
    description,
    post_address,
    visio_url,
    participants_count,
    organizer,
  } = rawEvent;

  return {
    uuid,
    name,
    description,
    visioUrl: visio_url != null ? visio_url : undefined,
    postAddress:
      post_address != null
        ? {
            address: post_address.address,
            cityName: post_address.city_name,
            countryCode: 'FR',
            postalCode: post_address.postal_code,
          }
        : undefined,
    organizer:
      organizer !== null
        ? { uuid: '123', firstName: organizer.first_name, lastName: organizer.last_name }
        : undefined,
    category,
    causeId: '3165e54b-aab9-40e4-90cf-2de59ac591ca',
    numberOfParticipants: typeof participants_count === 'number' ? participants_count : 0,
    mode: mode === 'online' ? 'online' : 'meeting',
    timeZone: time_zone,
    beginAt: begin_at,
    finishAt: finish_at,
  };
};
