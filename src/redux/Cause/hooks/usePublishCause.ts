import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { updateSnackbar } from 'redux/Snackbar';
import { Severity } from 'redux/Snackbar/types';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { PATHS } from 'routes';
import HandleErrorService from 'services/HandleErrorService';
import { getInCreationCause } from '../selectors';
import { cleanInCreationCause } from '../slice';
//import { authenticatedApiClient } from 'services/networking/client';

export const usePublishCause = () => {
  const causeWithoutAuthor = useSelector(getInCreationCause);
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const [{ loading, error }, doPublishCause] = useTypedAsyncFn(async () => {
    //await authenticatedApiClient.post('v3/causes/publish', { causeWithoutAuthor });
    console.log(causeWithoutAuthor);
    if (causeWithoutAuthor === undefined || causeWithoutAuthor.name.includes('error')) {
      throw new Error(causeWithoutAuthor === undefined ? 'Pas de cause' : causeWithoutAuthor.name);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }, []);

  const publishCause = useCallback(async () => {
    const response = await doPublishCause();
    if (response instanceof Error) return;

    push(PATHS.HOME.url());
    dispatch(
      updateSnackbar({
        message: formatMessage({ id: 'create_cause.success' }),
        severity: Severity.success,
      }),
    );
    dispatch(cleanInCreationCause());
  }, [dispatch, doPublishCause, formatMessage, push]);

  if (error !== undefined) {
    HandleErrorService.showErrorSnackbar(error);
  }
  return { loading, error, publishCause };
};
