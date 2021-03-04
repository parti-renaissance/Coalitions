import { state } from '__fixtures__/state';
import { COALITIONS_STORE, COALITIONS } from '../fixtures';
import { getCoalitions } from '../selectors';

const initialState = state;

describe('Coalition selectors', () => {
  describe('getCauses function', () => {
    it('Should return the value stored in store.coalition.coalitions initial state', () => {
      expect(getCoalitions(initialState)).toStrictEqual([]);
    });

    it('Should return the value stored in store.coalition.coalitions', () => {
      expect(getCoalitions({ ...initialState, coalition: COALITIONS_STORE })).toEqual(COALITIONS);
    });
  });
});
