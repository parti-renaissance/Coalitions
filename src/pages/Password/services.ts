import { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { getInCreationCause } from 'redux/Cause/selectors';
import { setAfterAuthRedirect } from 'redux/Login';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { PATHS } from 'routes';
import HandleErrorService, { APIErrorsType } from 'services/HandleErrorService';
import { oauthUrl } from 'services/networking/auth';
import { coalitionApiClient } from 'services/networking/client';
import { PasswordForm } from './Password';

export const useValidatePasswordForm = () => {
  const intl = useIntl();

  const validateForm = ({ password, passwordConfirmation }: PasswordForm) => {
    const errors = {} as PasswordForm;
    const requiredErrorMessage = intl.formatMessage({ id: 'form_errors.required' });

    if (password === undefined || password.length === 0) {
      errors.password = requiredErrorMessage;
    }

    if (password !== undefined && password.length < 8) {
      errors.password = intl.formatMessage({ id: 'form_errors.not-long-enough-password' });
    }

    if (passwordConfirmation === undefined || passwordConfirmation.length === 0) {
      errors.passwordConfirmation = requiredErrorMessage;
    }

    if (password !== passwordConfirmation) {
      errors.passwordConfirmation = intl.formatMessage({ id: 'form_errors.unmatched-password' });
    }

    return errors;
  };

  return { validateForm };
};

const useConfirmPasswordErrorHandler = () => {
  const { formatMessage } = useIntl();

  return useCallback(
    (error?: APIErrorsType) => {
      if (error instanceof Response || error === undefined || error.message === undefined) {
        return null;
      }
      if (error.message.includes('404')) {
        return formatMessage({ id: 'errors.incorrect-password-token' });
      }
      return null;
    },
    [formatMessage],
  );
};

type ConfirmPasswordPayload = {
  password: string;
  passwordConfirmation: string;
  identifier: string;
  token: string;
};

export const useConfirmPassword = () => {
  const causeToPublish = useSelector(getInCreationCause);
  const dispatch = useDispatch();
  const errorHandler = useConfirmPasswordErrorHandler();
  //const [, login] = useLogin();

  const [{ loading, error }, doConfirmPassword] = useTypedAsyncFn(
    async (payload: ConfirmPasswordPayload) => {
      return await coalitionApiClient.post(
        `profile/mot-de-passe/${payload.identifier}/${payload.token}`,
        {
          password: payload.password,
        },
      );
    },
    [],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error, errorHandler);
    }
  }, [error, errorHandler]);

  const confirmPasswordAndLogin = useCallback(
    async (password: string, passwordConfirmation: string, identifier: string, token: string) => {
      const response = await doConfirmPassword({
        password,
        passwordConfirmation,
        identifier,
        token,
      });
      if (response instanceof Error) return;

      //await login(response.code)
      //dispatch(userLoggedIn({ accessToken: 'accessToken', refreshToken: 'refreshToken' }));
      if (causeToPublish !== undefined) {
        dispatch(setAfterAuthRedirect(PATHS.CAUSE_PREVIEW.url()));
      }
      window.location.href = oauthUrl;
    },
    [causeToPublish, dispatch, doConfirmPassword],
  );

  return { loading, error, confirmPasswordAndLogin };
};
