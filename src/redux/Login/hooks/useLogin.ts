import { login } from 'services/networking/auth';
import { useDispatch } from 'react-redux';
import * as Sentry from '@sentry/browser';
import jwt_decode from 'jwt-decode';
import { userLoggedIn } from '../slice';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { useAfterAuthAction } from './useAfterAuthAction';

export const useLogin = () => {
  const dispatch = useDispatch();
  const { performAfterAuthAction } = useAfterAuthAction();

  return useTypedAsyncFn<{ code: string }>(
    async ({ code }) => {
      const { accessToken, refreshToken } = await login(code);
      if (accessToken !== null) {
        dispatch(userLoggedIn({ accessToken, refreshToken }));
        Sentry.configureScope(scope => {
          scope.setUser({
            ...jwt_decode(accessToken),
          });
        });
        await performAfterAuthAction();
      } else {
        throw new Error('No token in login response body');
      }
    },
    [dispatch, performAfterAuthAction],
  );
};
