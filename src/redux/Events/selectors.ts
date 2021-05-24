import { RootState } from 'redux/types';
import { EventType } from './types';

export const getAllEvents = (store: RootState) => {
  return store.event.ids.map(id => store.event.events[id]);
};

export const getEvent = (id: string) => (store: RootState): EventType | undefined => {
  return store.event.events[id];
};

export const getEventParticipateModal = (store: RootState): EventType | null => {
  return store.event.eventParticipateModal;
};
