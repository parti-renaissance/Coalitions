import { state } from '__fixtures__/state';
import { getAllCauses } from '../selectors';

const initialState = state;

describe('Cause selectors', () => {
  describe('getAllCauses function', () => {
    it('Should return the value stored in store.cause.causes', () => {
      expect(getAllCauses(initialState)).toStrictEqual([]);
    });
  });
});
