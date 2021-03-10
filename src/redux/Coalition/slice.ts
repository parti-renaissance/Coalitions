import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coalition } from './types';

export type CoalitionState = {
  coalitions: { [id: string]: Coalition };
  ids: string[];
};

export const initialState: CoalitionState = {
  coalitions: {},
  ids: [],
};

export const updateCoalitionsReducer = (
  state: CoalitionState,
  action: PayloadAction<Coalition[]>,
) => {
  state.coalitions = action.payload.reduce(
    (accumulator, coalition) => ({
      ...accumulator,
      [coalition.uuid]: coalition,
    }),
    {},
  );
  state.ids = action.payload.map(coalition => coalition.uuid);
};

const coalitionSlice = createSlice({
  name: 'Coalition',
  initialState,
  reducers: {
    updateCoalitions: updateCoalitionsReducer,
  },
});

export const { updateCoalitions } = coalitionSlice.actions;
export default coalitionSlice.reducer;
