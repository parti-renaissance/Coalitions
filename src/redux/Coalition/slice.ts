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

export const toggleFilterByCoalitionReducer = (
  state: CoalitionState,
  action: PayloadAction<Coalition>,
) => {
  state.coalitions[action.payload.uuid] = {
    ...state.coalitions[action.payload.uuid],
    filtered_by: !Boolean(state.coalitions[action.payload.uuid].filtered_by),
  };
};

export const clearFilterByCoalitionReducer = (state: CoalitionState) => {
  state.ids.map(id => (state.coalitions[id].filtered_by = false));
};

const coalitionSlice = createSlice({
  name: 'Coalition',
  initialState,
  reducers: {
    updateCoalitions: updateCoalitionsReducer,
    toggleFilterByCoalition: toggleFilterByCoalitionReducer,
    clearFilterByCoalition: clearFilterByCoalitionReducer,
  },
});

export const {
  updateCoalitions,
  clearFilterByCoalition,
  toggleFilterByCoalition,
} = coalitionSlice.actions;
export default coalitionSlice.reducer;
