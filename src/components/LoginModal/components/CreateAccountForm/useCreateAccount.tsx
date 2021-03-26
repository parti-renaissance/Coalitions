import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { updateSnackbar } from 'redux/Snackbar';
import { Severity } from 'redux/Snackbar/types';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import HandleErrorService from 'services/HandleErrorService';

export const useCreateAccount = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const [{ loading, error }, doCreateAccount] = useTypedAsyncFn(async () => {
    // TODO;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }, []);

  const createAccount = useCallback(async () => {
    const response = await doCreateAccount();

    if (response instanceof Error) return;

    dispatch(
      updateSnackbar({
        message: formatMessage({ id: 'login_modal.create_account.success' }),
        severity: Severity.success,
      }),
    );
  }, [dispatch, doCreateAccount, formatMessage]);

  if (error !== undefined) {
    HandleErrorService.showErrorSnackbar(error);
  }

  return { loading, error, createAccount };
};
