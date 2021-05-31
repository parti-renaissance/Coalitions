import { EventType } from '../types';
import { isBefore } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

export const isUpcomingEvent = (event: EventType): boolean => {
  const beginAt = zonedTimeToUtc(event.beginAt, event.timeZone);

  return isBefore(new Date(), beginAt);
};
