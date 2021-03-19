import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LoginState = Readonly<{
  accessToken: string | null;
  refreshToken: string | null;
  isLogged: boolean;
  afterAuthAction: { followCause: { id: string } | null; redirectTo: string | null };
}>;

const initialState: LoginState = {
  accessToken: null,
  refreshToken: null,
  isLogged: false,
  afterAuthAction: { followCause: null, redirectTo: null },
};

const loginSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    userLoggedIn: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string | null }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLogged = true;
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
