import { RootState } from 'redux/types';
import { Coalition } from './types';

export const getCoalitions = (store: RootState): Coalition[] => {
  return store.coalition.ids.map(id => store.coalition.coalitions[id]);
};

export const getCoalition = (id: string) => (store: RootState): Coalition | undefined => {
  return store.coalition.coalitions[id];
};

export const getFilteredByCoalitionIds = (store: RootState): string[] => {
  return Object.values(store.coalition.coalitions).reduce((acc: string[], coalition: Coalition) => {
    if (coalition.filtered_by) {
      acc.push(coalition.uuid);
    }
    return acc;
  }, []);
};
