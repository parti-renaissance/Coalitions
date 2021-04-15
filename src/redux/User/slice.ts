import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './types';

export type UserState = Readonly<{
  currentUser?: User;
}>;

const initialState: UserState = {
  currentUser: undefined,
};

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    updateCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    deleteCurrentUser: state => {
      state.currentUser = undefined;
    },
  },
});

export const { updateCurrentUser, deleteCurrentUser } = userSlice.actions;
export default userSlice.reducer;
