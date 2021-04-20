import { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { updateSnackbar } from 'redux/Snackbar';
import { Severity } from 'redux/Snackbar/types';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { PATHS } from 'routes';
import HandleErrorService, { APIErrorsType, doesErrorIncludes } from 'services/HandleErrorService';
import { getInCreationCause } from '../selectors';
import { cleanInCreationCause } from '../slice';
import { authenticatedApiClient } from 'services/networking/client';
import { Cause } from '../types';

const usePublishCauseErrorHandler = () => {
  const { formatMessage } = useIntl();

  return useCallback(
    (error?: APIErrorsType) => {
      if (error instanceof Response || error === undefined || error.message === undefined) {
        return null;
      }
      if (doesErrorIncludes(error, 'name: Cette valeur est déjà utilisée')) {
        return formatMessage({ id: 'errors.already-used-cause-name' });
      }
      return null;
    },
    [formatMessage],
  );
};

export const usePublishCause = () => {
  const causeWithoutAuthor = useSelector(getInCreationCause);
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const errorHandler = usePublishCauseErrorHandler();

  const [{ loading, error }, doPublishCause] = useTypedAsyncFn(async () => {
    const publishedCause: Cause = await authenticatedApiClient.post('v3/causes', {
      name: causeWithoutAuthor?.name,
      description: causeWithoutAuthor?.description,
      coalition: causeWithoutAuthor?.coalition?.uuid,
      second_coalition: causeWithoutAuthor?.second_coalition?.uuid,
    });
    return await authenticatedApiClient.post(`v3/causes/${publishedCause.uuid}/image`, {
      content: causeWithoutAuthor?.image_url,
    });
  }, []);

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error, errorHandler);
    }
  }, [error, errorHandler]);

  const publishCause = useCallback(async () => {
    const response = await doPublishCause();
    if (response instanceof Error) return;

    push({ pathname: PATHS.HOME.url(), search: `?publishedCause=true` });
    dispatch(
      updateSnackbar({
        message: formatMessage({ id: 'create_cause.success' }),
        severity: Severity.success,
      }),
    );
    dispatch(cleanInCreationCause());
  }, [dispatch, doPublishCause, formatMessage, push]);

  return { loading, error, publishCause };
};
