import { act, renderHook } from '@testing-library/react-hooks';
import * as hooks from './useAfterAuthAction';
import * as auth from 'services/networking/auth';
import { useLogin } from './useLogin';

const authorization_code = 'authorization_code';
const accessToken = 'accessToken';
const refreshToken = 'refreshToken';

const login = jest.fn();
jest.spyOn(auth, 'login').mockImplementation(login);

const performAfterAuthAction = jest.fn();
jest.spyOn(hooks, 'useAfterAuthAction').mockImplementation(() => {
  return { performAfterAuthAction };
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('useLogin', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a function to log the user with an authorizatioin code', async () => {
    login.mockResolvedValueOnce({ accessToken, refreshToken });
    const { result } = renderHook(() => useLogin());
    void (await act(() => result.current[1]({ code: authorization_code })));
    expect(login).toHaveBeenCalledWith(authorization_code);
    expect(mockDispatch.mock.calls).toEqual([
      [
        {
          payload: { accessToken, refreshToken },
          type: 'Login/userLoggedIn',
        },
      ],
    ]);
    expect(performAfterAuthAction).toHaveBeenCalled();
  });

  it('should not auth if there is no token', async () => {
    login.mockResolvedValueOnce({ accessToken: null, refreshToken: null });
    const { result } = renderHook(() => useLogin());
    void (await act(() => result.current[1]({ code: authorization_code })));
    expect(login).toHaveBeenCalledWith(authorization_code);
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(performAfterAuthAction).not.toHaveBeenCalled();
  });
});
