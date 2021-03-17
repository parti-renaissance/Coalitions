import { useHistory } from 'react-router';
import { login } from 'services/networking/auth';
import { PATHS } from 'routes';
import { useDispatch, useSelector } from 'react-redux';
import * as Sentry from '@sentry/browser';
import jwt_decode from 'jwt-decode';
import { cleanAfterAuthAction, userLoggedIn } from './slice';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { getAfterAuthFollowCause, getAfterAuthRedirectTo } from './selectors';
import { useCallback } from 'react';
import { useCauseFollow } from 'redux/Cause/hooks';

export const useAfterAuthAction = () => {
  const causeToFollow = useSelector(getAfterAuthFollowCause);
  const redirectTo = useSelector(getAfterAuthRedirectTo);
  const { followCause } = useCauseFollow(causeToFollow);
  const dispatch = useDispatch();
  const { push } = useHistory();

  const performAfterAuthAction = useCallback(async () => {
    if (redirectTo !== '') {
      push(redirectTo, { search: '' });
    } else {
      push(PATHS.HOME.url(), { search: '' });
    }
    if (causeToFollow !== '') {
      await followCause();
    }
    dispatch(cleanAfterAuthAction);
  }, [causeToFollow, dispatch, followCause, push, redirectTo]);

  return { performAfterAuthAction };
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const { performAfterAuthAction } = useAfterAuthAction();

  return useTypedAsyncFn<{ code: string }>(
    async ({ code }) => {
      const token: string | undefined = await login(code);
      if (token !== undefined) {
        dispatch(userLoggedIn(token));
        Sentry.configureScope(scope => {
          scope.setUser({
            ...jwt_decode(token),
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
