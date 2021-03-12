import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SnackbarConfig } from './types';

export type SnackbarState = {
  snackbarConfig: SnackbarConfig | undefined;
};

export const initialState: SnackbarState = {
  snackbarConfig: undefined,
};

export const updateSnackbarReducer = (
  state: SnackbarState,
  action: PayloadAction<SnackbarConfig | undefined>,
) => {
  state.snackbarConfig = action.payload;
};

const snackbarSlice = createSlice({
  name: 'Snackbar',
  initialState,
  reducers: {
    updateSnackbar: updateSnackbarReducer,
  },
});

export const { updateSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
