import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'redux/User/selectors';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import HandleErrorService from 'services/HandleErrorService';
import { authenticatedApiClient } from 'services/networking/client';
import { CGUFormValues } from './CGUModal';

type SubmitCGUPayload = {
  coalition_subscription?: boolean;
  cause_subscription?: boolean;
  coalitions_cgu_accepted?: boolean;
};

export const useSubmitCGU = () => {
  const currentUser = useSelector(getCurrentUser);

  const [{ loading, error }, doSubmitCGU] = useTypedAsyncFn(
    async (payload: SubmitCGUPayload) => {
      await authenticatedApiClient.put(
        `v3/profile/${currentUser !== undefined ? currentUser.uuid : ''}`,
        { ...payload },
      );
    },
    [currentUser],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const submitCGU = useCallback(
    async (values: CGUFormValues) => {
      await doSubmitCGU({
        coalition_subscription: values.coalitionMailAgreement,
        cause_subscription: values.causeMailAgreement,
        coalitions_cgu_accepted: values.cguAgreement,
      });
    },
    [doSubmitCGU],
  );

  return { loading, error, submitCGU };
};
