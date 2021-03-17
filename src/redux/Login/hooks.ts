import { useHistory } from 'react-router';
import { login } from 'services/networking/auth';
import { PATHS } from 'routes';
import { useDispatch, useSelector } from 'react-redux';
import * as Sentry from '@sentry/browser';
import jwt_decode from 'jwt-decode';
import { removeAfterAuthFollowCause, userLoggedIn } from './slice';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { getAfterAuthFollowCause } from './selectors';
import { useCallback } from 'react';
import { useCauseFollow } from 'redux/Cause/hooks';

export const useAfterAuthAction = () => {
  const causeToFollow = useSelector(getAfterAuthFollowCause);
  const { followCause } = useCauseFollow(causeToFollow);
  const dispatch = useDispatch();

  const performAfterAuthAction = useCallback(async () => {
    if (causeToFollow !== '') {
      await followCause();
      dispatch(removeAfterAuthFollowCause);
    }
  }, [causeToFollow, dispatch, followCause]);

  return { performAfterAuthAction };
};

export const useLogin = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { performAfterAuthAction } = useAfterAuthAction();

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
        await performAfterAuthAction();
        push(PATHS.HOME.url(), { search: '' });
      } else {
        throw new Error('No token in login response body');
      }
    },
    [push, dispatch, performAfterAuthAction],
  );
};
