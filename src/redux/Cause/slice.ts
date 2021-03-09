import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cause } from './types';

export type CauseState = Readonly<{
  causes: { [id: string]: Cause };
  ids: string[];
  numberOfCauses: number | null;
}>;

const initialState: CauseState = {
  causes: {},
  ids: [],
  numberOfCauses: null,
};

const causeSlice = createSlice({
  name: 'Cause',
  initialState,
  reducers: {
    updateCauses: (state, action: PayloadAction<{ causes: Cause[]; numberOfCauses: number }>) => {
      state.causes = action.payload.causes.reduce(
        (accumulator, cause) => ({
          ...accumulator,
          [cause.uuid]: cause,
        }),
        state.causes,
      );
      state.ids = [...new Set([...state.ids, ...action.payload.causes.map(cause => cause.uuid)])];
      state.numberOfCauses = action.payload.numberOfCauses;
    },
    updateOneCause: (state, action: PayloadAction<Cause>) => {
      state.causes[action.payload.uuid] = action.payload;
      if (!state.ids.includes(action.payload.uuid)) {
        state.ids = [...state.ids, action.payload.uuid];
      }
    },
  },
});

export const { updateCauses, updateOneCause } = causeSlice.actions;
export default causeSlice.reducer;
