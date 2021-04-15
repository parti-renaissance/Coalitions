import { useCallback, useEffect } from 'react';
//import { useIntl } from 'react-intl';
//import { useDispatch } from 'react-redux';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import HandleErrorService from 'services/HandleErrorService';
//import { authenticatedApiClient } from 'services/networking/client';
import { CGUFormValues } from './CGUModal';

type SubmitCGUPayload = {
  cguAgreement?: boolean;
  causeMailAgreement?: boolean;
  coalitionMailAgreement?: boolean;
};

export const useSubmitCGU = (userId?: string) => {
  //const dispatch = useDispatch();
  //const { formatMessage } = useIntl();

  const [{ loading, error }, doSubmitCGU] = useTypedAsyncFn(async (payload: SubmitCGUPayload) => {
    //await authenticatedApiClient.put(`v3/profile/${userId}`, { ...payload });
    await new Promise(resolve => setTimeout(resolve, 1000));
  }, []);

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const submitCGU = useCallback(
    async (values: CGUFormValues) => {
      await doSubmitCGU(values);
    },
    [doSubmitCGU],
  );

  return { loading, error, submitCGU };
};
