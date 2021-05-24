import { RootState } from 'redux/types';
import { EventType } from './types';
import { FAKE_EVENT } from './hooks/useFetchEvent';

export const getEvents = (store: RootState) => {
  return store.event.ids.map(id => store.event.events[id]);
};

export const getEvent = (id: string) => (store: RootState): EventType | undefined => {
  const event = store.event.events[id];
  return event !== undefined ? event : FAKE_EVENT;
};
