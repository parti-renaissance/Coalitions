import { RootState } from 'redux/types';

export const getCauses = (store: RootState) => {
  return store.cause.causes;
};
