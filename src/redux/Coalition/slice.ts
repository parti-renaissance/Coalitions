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
        state.coalitions[action.payload].cause_followers_count =
          state.coalitions[action.payload].cause_followers_count + 1;
      }
    },
    markCoalitionsAsFollowed: (state, action: PayloadAction<string[]>) => {
      state.coalitions = action.payload.reduce(
        (coalitions, followedCoalitionId) => {
          coalitions[followedCoalitionId].followed = true;
          return coalitions;
        },
        { ...state.coalitions },
      );
    },
    optimisticallyRemoveFollow: (state, action: PayloadAction<string>) => {
      state.coalitions[action.payload].followed = false;
    },
  },
});

export const {
  updateCoalitions,
  optimisticallyMarkCoalitionAsFollowed,
  markCoalitionsAsFollowed,
  optimisticallyRemoveFollow,
} = coalitionSlice.actions;
export default coalitionSlice.reducer;
