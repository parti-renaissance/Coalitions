import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LoginState = Readonly<{
  token: string | null;
  afterAuthAction: { followCause: { id: string } | null; redirectTo: string | null };
}>;

const initialState: LoginState = {
  token: null,
  afterAuthAction: { followCause: null, redirectTo: null },
};

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
    setAfterAuthRedirect: (state, action: PayloadAction<string>) => {
      state.afterAuthAction.redirectTo = action.payload;
    },
    cleanAfterAuthAction: state => {
      state.afterAuthAction = initialState.afterAuthAction;
    },
  },
});

export const {
  userLoggedIn,
  userLoggedOut,
  setAfterAuthFollowCause,
  setAfterAuthRedirect,
  cleanAfterAuthAction,
} = loginSlice.actions;
export default loginSlice.reducer;
