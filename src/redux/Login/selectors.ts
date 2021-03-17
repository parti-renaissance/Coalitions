import { RootState } from 'redux/types';

export const getUserToken = (store: RootState) => store.login.token;
export const getAfterAuthFollowCause = (store: RootState) =>
  store.login.afterAuthAction !== undefined && store.login.afterAuthAction.followCause !== null
    ? store.login.afterAuthAction.followCause.id
    : '';
