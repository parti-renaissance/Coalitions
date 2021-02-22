import { RootState } from 'redux2/types';

export const getUserToken = (store: RootState) => store.login.token;
