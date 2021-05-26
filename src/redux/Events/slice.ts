import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventType } from './types';

export type EventState = Readonly<{
  events: { [id: string]: EventType };
  ids: string[];
  eventParticipateModal: EventType | null;
}>;

const initialState: EventState = {
  events: {},
  ids: [],
  eventParticipateModal: null,
};

const eventSlice = createSlice({
  name: 'Event',
  initialState,
  reducers: {
    resetEvents: state => {
      state.ids = [];
    },
    updateEvents: (state, action: PayloadAction<EventType[]>) => {
      state.events = action.payload.reduce(
        (accumulator, event) => ({
          ...accumulator,
          [event.uuid]: event,
        }),
        state.events,
      );
      state.ids = [...new Set([...state.ids, ...action.payload.map(event => event.uuid)])];
    },
    updateOneEvent: (state, action: PayloadAction<EventType>) => {
      const numberOfParticipants = state.events[action.payload.uuid]?.participants_count;
      state.events[action.payload.uuid] = {
        ...action.payload,
        participants_count:
          numberOfParticipants !== undefined
            ? Math.max(numberOfParticipants, action.payload.participants_count)
            : action.payload.participants_count,
      };
      if (!state.ids.includes(action.payload.uuid)) {
        state.ids = [...state.ids, action.payload.uuid];
      }
    },
    optimisticallyMarkParticipateToEvent: (state, action: PayloadAction<string>) => {
      if (state.events[action.payload] !== undefined) {
        state.events[action.payload].participate = true;
        state.events[action.payload].participants_count =
          state.events[action.payload].participants_count + 1;
      }
    },
    optimisticallyRemoveEventParticipation: (state, action: PayloadAction<string>) => {
      state.events[action.payload].participate = false;
      state.events[action.payload].participants_count = Math.max(
        state.events[action.payload].participants_count - 1,
        0,
      );
    },
    openEventParticipateModal: (state, action: PayloadAction<EventType | null>) => {
      state.eventParticipateModal = action.payload;
    },
    closeEventParticipateModal: state => {
      state.eventParticipateModal = null;
    },
  },
});

export const {
  resetEvents,
  updateEvents,
  updateOneEvent,
  optimisticallyMarkParticipateToEvent,
  optimisticallyRemoveEventParticipation,
  openEventParticipateModal,
  closeEventParticipateModal,
} = eventSlice.actions;
export default eventSlice.reducer;
