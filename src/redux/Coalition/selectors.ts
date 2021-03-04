import { RootState } from 'redux/types';
import { Coalition } from './types';

export const getCoalitions = (store: RootState): Coalition[] => {
  return store.coalition.ids.map(id => store.coalition.coalitions[id]);
};
