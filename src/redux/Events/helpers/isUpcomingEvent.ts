import { EventType } from '../types';
import { zonedTimeToUtc } from 'date-fns-tz';
import { isBefore } from 'date-fns';

export const isUpcomingEvent = (event: EventType): boolean => {
  const utcDate = zonedTimeToUtc(event.begin_at, event.time_zone);
  return isBefore(new Date(), utcDate);
};
