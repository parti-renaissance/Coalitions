import { EventType } from '../types';
import { isBefore } from 'date-fns';

export const isUpcomingEvent = (event: EventType): boolean => {
  return isBefore(new Date(), new Date(event.begin_at));
};
