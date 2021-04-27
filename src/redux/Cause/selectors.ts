import { RootState } from 'redux/types';
import { CauseStatistics } from './slice';
import { Cause, InCreationCause, QuickAction } from './types';

export const getAllCauses = (store: RootState) => {
  return store.cause.ids.map(id => store.cause.causes[id]);
};

export const getCause = (idOrSlug: string | null) => (store: RootState): Cause | undefined => {
  if (idOrSlug === null) {
    return undefined;
  }

  const cause = store.cause.causes[idOrSlug as string];
  if (cause !== undefined) {
    return cause;
  }

  return (Object.values(store.cause.causes) as Cause[]).find(({ slug }) => slug === idOrSlug);
};

export const getCauseQuickActions = (id?: string) => (
  store: RootState,
): QuickAction[] | undefined => {
  if (id === undefined) {
    return;
  }
  return store.cause.causes[id].quickActions;
};

export const getNumberOfCauses = (store: RootState) => {
  return store.cause.numberOfCauses;
};

export const getInCreationCause = (store: RootState): InCreationCause | undefined => {
  return store.cause.inCreationCause;
};

export const getCauseStatistics = (store: RootState): CauseStatistics | null => {
  return store.cause.statistics;
};
