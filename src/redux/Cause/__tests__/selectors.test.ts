import { state } from '__fixtures__/state';
import { getCauses } from '../selectors';

const initialState = state;

describe('Cause selectors', () => {
  describe('getCauses function', () => {
    it('Should return the value stored in store.cause.causes', () => {
      expect(getCauses(initialState)).toStrictEqual([]);
    });
  });
});
