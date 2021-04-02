import { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { updateSnackbar } from 'redux/Snackbar';
import { Severity } from 'redux/Snackbar/types';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { InscriptionFormValues } from 'components/LoginModal/components/CreateAccountForm/lib/useValidateForm';
import HandleErrorService from 'services/HandleErrorService';
import { coalitionApiClient } from 'services/networking/client';
import { OAUTH_SOURCE } from 'services/networking/auth';

type CreateAccountPayload = {
  first_name: string;
  email_address: string;
  zone: string;
  cgu_accepted: boolean;
  cause_subscription: boolean;
  coalition_subscription: boolean;
  source: string;
};

export const useCreateAccount = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const [{ loading, error }, doCreateAccount] = useTypedAsyncFn(
    async (payload: CreateAccountPayload) => {
      await coalitionApiClient.post('membership', { ...payload });
    },
    [],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const createAccount = useCallback(
    async (values: InscriptionFormValues) => {
      const response = await doCreateAccount({
        email_address: values.email !== undefined ? values.email : '',
        first_name: values.firstName !== undefined ? values.firstName : '',
        zone: values.cityId !== undefined ? values.cityId : '',
        cgu_accepted: Boolean(values.cguAgreement),
        cause_subscription: Boolean(values.causeMailAgreement),
        coalition_subscription: Boolean(values.coalitionMailAgreement),
        source: OAUTH_SOURCE,
      });

      if (response instanceof Error) return;

      dispatch(
        updateSnackbar({
          message: formatMessage({ id: 'login_modal.create_account.success' }),
          severity: Severity.success,
        }),
      );
    },
    [dispatch, doCreateAccount, formatMessage],
  );

  return { loading, error, createAccount };
};
