import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cause, InCreationCauseWithoutAuthor } from './types';

export type CauseState = Readonly<{
  causes: { [id: string]: Cause };
  ids: string[];
  numberOfCauses: number | null;
  inCreationCause?: InCreationCauseWithoutAuthor;
}>;

const initialState: CauseState = {
  causes: {},
  ids: [],
  numberOfCauses: null,
  inCreationCause: undefined,
};

const causeSlice = createSlice({
  name: 'Cause',
  initialState,
  reducers: {
    resetCauses: state => {
      state.ids = [];
    },
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
    optimisticallyMarkCauseAsSupported: (state, action: PayloadAction<string>) => {
      state.causes[action.payload].supported = true;
      state.causes[action.payload].followers_count =
        state.causes[action.payload].followers_count + 1;
    },
    markCausesAsSupported: (state, action: PayloadAction<string[]>) => {
      state.causes = action.payload.reduce(
        (causes, supportedCauseId) => {
          causes[supportedCauseId].supported = true;
          return causes;
        },
        { ...state.causes },
      );
    },
    updateInCreationCause: (state, action: PayloadAction<InCreationCauseWithoutAuthor>) => {
      state.inCreationCause = action.payload;
    },
  },
});

export const {
  resetCauses,
  updateCauses,
  updateOneCause,
  markCausesAsSupported,
  optimisticallyMarkCauseAsSupported,
  updateInCreationCause,
} = causeSlice.actions;
export default causeSlice.reducer;
