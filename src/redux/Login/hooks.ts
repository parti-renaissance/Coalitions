import { useHistory } from 'react-router';
import { login } from 'services/networking/client';
import { PATHS } from 'routes';
import { useDispatch } from 'react-redux';
import * as Sentry from '@sentry/browser';
import jwt_decode from 'jwt-decode';
import { userLoggedIn } from './slice';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';

export const useLogin = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();

  return useTypedAsyncFn<{ code: string }>(
    async ({ code }) => {
      const token: string | undefined = await login(code);
      if (token) {
        dispatch(userLoggedIn(token));
        Sentry.configureScope(scope => {
          scope.setUser({
            ...jwt_decode(token),
          });
        });
        push(PATHS.HOME.url(), { search: '' });
      } else {
        throw new Error('No token in login response body');
      }
    },
    [push, dispatch],
  );
};
