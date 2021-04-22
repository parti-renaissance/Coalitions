import { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { InscriptionFormValues } from 'components/LoginModal/components/CreateAccountForm/lib/useValidateForm';
import HandleErrorService, { APIErrorsType, doesErrorIncludes } from 'services/HandleErrorService';
import { coalitionApiClient } from 'services/networking/client';
import { OAUTH_SOURCE } from 'services/networking/auth';

const useCreateAccountErrorHandler = () => {
  const { formatMessage } = useIntl();

  return useCallback(
    (error?: APIErrorsType) => {
      if (error instanceof Response || error === undefined || error.message === undefined) {
        return null;
      }
      if (doesErrorIncludes(error, 'email_address: Cette adresse e-mail existe')) {
        return formatMessage({ id: 'errors.mail-of-existing-account' });
      }
      return null;
    },
    [formatMessage],
  );
};

type CreateAccountPayload = {
  first_name: string;
  email_address: string;
  zone: string;
  cgu_accepted: boolean;
  cause_subscription: boolean;
  coalition_subscription: boolean;
  source: string;
};

export const useCreateAccount = (doAfterAccountCreation?: () => Promise<void>) => {
  const errorHandler = useCreateAccountErrorHandler();

  const [{ loading, error }, doCreateAccount] = useTypedAsyncFn(
    async (payload: CreateAccountPayload) => {
      await coalitionApiClient.post('membership', { ...payload });
    },
    [],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error, errorHandler);
    }
  }, [error, errorHandler]);

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

      if (doAfterAccountCreation !== undefined) {
        await doAfterAccountCreation();
      }
    },
    [doAfterAccountCreation, doCreateAccount],
  );

  return { loading, error, createAccount };
};
