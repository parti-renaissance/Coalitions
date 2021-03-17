import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LoginState = Readonly<{
  token: string | null;
  afterAuthAction: { followCause: { id: string } | null };
}>;

const initialState: LoginState = { token: null, afterAuthAction: { followCause: null } };

const loginSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    userLoggedOut: () => initialState,
    setAfterAuthFollowCause: (state, action: PayloadAction<string>) => {
      state.afterAuthAction.followCause = { id: action.payload };
    },
    removeAfterAuthFollowCause: state => {
      state.afterAuthAction.followCause = null;
    },
  },
});

export const {
  userLoggedIn,
  userLoggedOut,
  setAfterAuthFollowCause,
  removeAfterAuthFollowCause,
} = loginSlice.actions;
export default loginSlice.reducer;
