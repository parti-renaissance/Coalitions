import { RootState } from 'redux/types';
import { User } from './types';

export const getCurrentUser = (store: RootState): User | undefined => {
  return store.user.currentUser;
};
