import { useCallback, useEffect } from 'react';
import { InscriptionFormValues } from 'components/LoginModal/components/CreateAccountForm/lib/useValidateForm';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { updateSnackbar } from 'redux/Snackbar';
import { Severity } from 'redux/Snackbar/types';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import HandleErrorService, { APIErrorsType, doesErrorIncludes } from 'services/HandleErrorService';
import { coalitionApiClient } from 'services/networking/client';
import { optimisticallyIncrementCauseFollower } from '../slice';
import { getCauseSupportModal } from '../selectors';

const useUnauthenticatedCauseFollowErrorHandler = () => {
  const { formatMessage } = useIntl();

  return useCallback(
    (error?: APIErrorsType) => {
      if (error instanceof Response || error === undefined || error.message === undefined) {
        return null;
      }
      if (doesErrorIncludes(error, 'Vous avez déjà soutenu cette cause')) {
        return formatMessage({ id: 'errors.already-followed-cause-for-unauthenticated' });
      }
      if (doesErrorIncludes(error, 'utilisateur avec cette adresse e-mail existe déjà')) {
        return formatMessage({ id: 'errors.mail-of-existing-account-for-support' });
      }
      return null;
    },
    [formatMessage],
  );
};

type UnauthenticatedCauseFollowPayload = {
  email_address: string;
  first_name: string;
  zone: string;
  cgu_accepted: boolean;
  cause_subscription: boolean;
  coalition_subscription: boolean;
};

export const useUnauthenticatedCauseFollow = (onClose?: () => void) => {
  const dispatch = useDispatch();
  const cause = useSelector(getCauseSupportModal);
  const causeId = cause !== null ? cause.uuid : '';
  const { formatMessage } = useIntl();
  const errorHandler = useUnauthenticatedCauseFollowErrorHandler();

  const [{ loading, error }, doUnauthenticatedCauseFollow] = useTypedAsyncFn(
    async (payload: UnauthenticatedCauseFollowPayload) => {
      await coalitionApiClient.put(`causes/${causeId}/follower`, {
        ...payload,
      });
    },
    [causeId],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error, errorHandler);
    }
  }, [error, errorHandler]);

  const unauthenticatedCauseFollow = useCallback(
    async (values: InscriptionFormValues) => {
      if (loading) {
        return;
      }
      const response = await doUnauthenticatedCauseFollow({
        email_address: values.email !== undefined ? values.email : '',
        first_name: values.firstName !== undefined ? values.firstName : '',
        zone: values.cityId !== undefined ? values.cityId : '',
        cgu_accepted: Boolean(values.cguAgreement),
        cause_subscription: Boolean(values.causeMailAgreement),
        coalition_subscription: Boolean(values.coalitionMailAgreement),
      });

      if (response instanceof Error) return;

      if (onClose !== undefined) {
        onClose();
      }

      dispatch(optimisticallyIncrementCauseFollower(causeId));
      dispatch(
        updateSnackbar({
          message: formatMessage({ id: 'login_modal.create_account.success' }),
          severity: Severity.success,
        }),
      );
    },
    [causeId, dispatch, doUnauthenticatedCauseFollow, formatMessage, loading, onClose],
  );

  return { loading, error, unauthenticatedCauseFollow };
};
