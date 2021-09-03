import { useEffect, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { updateSnackbar } from 'redux/Snackbar';
import { Severity } from 'redux/Snackbar/types';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { PATHS } from 'routes';
import HandleErrorService from 'services/HandleErrorService';

export const useCancelEvent = (id: string) => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { formatMessage } = useIntl();

  const [{ loading, error }, doCancelEvent] = useTypedAsyncFn(async () => {
    return new Promise(resolve => setTimeout(resolve, 3000));
  }, []);

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const cancelEvent = useCallback(async () => {
    const response = await doCancelEvent();

    if (response instanceof Error) {
      return;
    }

    push(PATHS.CAUSE.url('test'));
    dispatch(
      updateSnackbar({
        message: formatMessage({ id: 'event_form.update.cancel_success' }),
        severity: Severity.success,
      }),
    );
  }, [dispatch, doCancelEvent, push, formatMessage]);

  return { loading, cancelEvent };
};
