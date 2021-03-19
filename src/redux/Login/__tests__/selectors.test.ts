import { state } from '__fixtures__/state';
import { getAccessToken, getRefreshToken } from '../selectors';

const accessToken = 'OX1dSSVRFX1BPU1QsQ0FOX1JFQURfTkV';
const refreshToken = 'refreshToken';

const initialState = { ...state, login: { ...state.login, accessToken, refreshToken } };

describe('Login selectors', () => {
  describe('getAccessToken function', () => {
    it('Should return the value stored in store.login.token', () => {
      expect(getAccessToken(initialState)).toBe(accessToken);
    });
  });
  describe('getRefreshToken function', () => {
    it('Should return the value stored in store.login.token', () => {
      expect(getRefreshToken(initialState)).toBe(refreshToken);
    });
  });
});
