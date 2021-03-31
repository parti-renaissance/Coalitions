import { useCallback, useEffect } from 'react';
import { InscriptionFormValues } from 'components/LoginModal/components/CreateAccountForm/lib/useValidateForm';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { updateSnackbar } from 'redux/Snackbar';
import { Severity } from 'redux/Snackbar/types';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import HandleErrorService from 'services/HandleErrorService';
import { coalitionApiClient } from 'services/networking/client';
import { optimisticallyIncrementCauseFollower } from '../slice';

type UnauthenticatedCauseFollowPayload = {
  email_address: string;
  first_name: string;
  zone: string;
  cgu_accepted: boolean;
  cause_subscription: boolean;
  coalition_subscription: boolean;
};

export const useUnauthenticatedCauseFollow = (causeId: string) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const [{ loading, error }, doUnauthenticatedCauseFollow] = useTypedAsyncFn(
    async (payload: UnauthenticatedCauseFollowPayload) => {
      await coalitionApiClient.put(`causes/${causeId}/follower`, { ...payload });
    },
    [],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const unauthenticatedCauseFollow = useCallback(
    async (values: InscriptionFormValues) => {
      const response = await doUnauthenticatedCauseFollow({
        email_address: values.email !== undefined ? values.email : '',
        first_name: values.firstName !== undefined ? values.firstName : '',
        zone: values.cityId !== undefined ? values.cityId : '',
        cgu_accepted: Boolean(values.cguAgreement),
        cause_subscription: Boolean(values.causeMailAgreement),
        coalition_subscription: Boolean(values.coalitionMailAgreement),
      });

      if (response instanceof Error) return;

      dispatch(optimisticallyIncrementCauseFollower(causeId));
      dispatch(
        updateSnackbar({
          message: formatMessage({ id: 'login_modal.create_account.success' }),
          severity: Severity.success,
        }),
      );
    },
    [causeId, dispatch, doUnauthenticatedCauseFollow, formatMessage],
  );

  return { loading, error, unauthenticatedCauseFollow };
};
