import { RootState } from 'redux/types';
import { Cause } from './types';

export const getAllCauses = (store: RootState) => {
  return store.cause.ids.map(id => store.cause.causes[id]);
};

export const getCause = (id: string) => (store: RootState): Cause | undefined => {
  return store.cause.causes[id];
};

export const getNumberOfCauses = (store: RootState) => {
  return store.cause.numberOfCauses;
};
