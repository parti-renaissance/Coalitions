import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cause } from './types';

export type CauseState = Readonly<{
  causes: Cause[];
}>;

const initialState: CauseState = {
  causes: [],
};

const causeSlice = createSlice({
  name: 'Cause',
  initialState,
  reducers: {
    updateCauses: (state, action: PayloadAction<Cause[]>) => {
      state.causes = [...state.causes, ...action.payload];
    },
  },
});

export const { updateCauses } = causeSlice.actions;
export default causeSlice.reducer;
