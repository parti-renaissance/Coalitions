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
    optimisticallyMarkCoalitionAsFollowed: (state, action: PayloadAction<string>) => {
      if (state.coalitions[action.payload] !== undefined) {
        state.coalitions[action.payload].followed = true;
        state.coalitions[action.payload].followers_count =
          state.coalitions[action.payload].followers_count + 1;
      }
    },
  },
});

export const { updateCoalitions, optimisticallyMarkCoalitionAsFollowed } = coalitionSlice.actions;
export default coalitionSlice.reducer;
