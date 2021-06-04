import { EventType } from '../types';
import { isBefore } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

export const isUpcomingEvent = (event: EventType): boolean => {
  const finishAt = zonedTimeToUtc(event.finishAt, event.timeZone);

  return isBefore(new Date(), finishAt);
};
