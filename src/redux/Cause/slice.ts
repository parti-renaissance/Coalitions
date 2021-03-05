import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cause } from './types';

export type CauseState = Readonly<{
  causes: Cause[];
  numberOfCauses: number | null;
}>;

const initialState: CauseState = {
  causes: [],
  numberOfCauses: null,
};

const causeSlice = createSlice({
  name: 'Cause',
  initialState,
  reducers: {
    updateCauses: (state, action: PayloadAction<{ causes: Cause[]; numberOfCauses: number }>) => {
      state.causes = [...state.causes, ...action.payload.causes];
      state.numberOfCauses = action.payload.numberOfCauses;
    },
  },
});

export const { updateCauses } = causeSlice.actions;
export default causeSlice.reducer;
