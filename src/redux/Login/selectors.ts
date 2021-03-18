import { RootState } from 'redux/types';

export const getUserToken = (store: RootState) => store.login.token;

export const isUserLogged = (store: RootState) => Boolean(store.login.isLogged);

export const getAfterAuthFollowCause = (store: RootState) =>
  store.login.afterAuthAction !== undefined && store.login.afterAuthAction.followCause !== null
    ? store.login.afterAuthAction.followCause.id
    : '';

export const getAfterAuthRedirectTo = (store: RootState) =>
  store.login.afterAuthAction !== undefined && store.login.afterAuthAction.redirectTo !== null
    ? store.login.afterAuthAction.redirectTo
    : '';
