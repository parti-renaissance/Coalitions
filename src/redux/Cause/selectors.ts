import { RootState } from 'redux/types';
import { Cause, InCreationCause } from './types';

export const getAllCauses = (store: RootState) => {
  return store.cause.ids.map(id => store.cause.causes[id]);
};

export const getCause = (id: string | null) => (store: RootState): Cause | undefined => {
  if (id === null) {
    return undefined;
  }
  return store.cause.causes[id as string];
};

export const getNumberOfCauses = (store: RootState) => {
  return store.cause.numberOfCauses;
};

export const getInCreationCause = (store: RootState): InCreationCause | undefined => {
  return store.cause.inCreationCause;
};
