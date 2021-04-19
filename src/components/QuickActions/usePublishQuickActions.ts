import { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { updateSnackbar } from 'redux/Snackbar';
import { Severity } from 'redux/Snackbar/types';
import { QuickAction } from 'redux/Cause/types';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { PATHS } from 'routes';
import HandleErrorService, { APIErrorsType } from 'services/HandleErrorService';
import { authenticatedApiClient } from 'services/networking/client';

const usePublishQuickActionsErrorHandler = () => {
  const { formatMessage } = useIntl();

  return useCallback(
    (error?: APIErrorsType) => {
      if (error instanceof Response || error === undefined || error.message === undefined) {
        return null;
      }
      if (error.message.includes('name: Cette valeur est déjà utilisée')) {
        return formatMessage({ id: 'errors.already-used-cause-name' });
      }
      return null;
    },
    [formatMessage],
  );
};

export const usePublishQuickActions = (causeId: string) => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const errorHandler = usePublishQuickActionsErrorHandler();

  const [{ loading, error }, doPublishQuickActions] = useTypedAsyncFn(
    async (quickActions: QuickAction[]) => {
      await authenticatedApiClient.put(`v3/causes/${causeId}`, {
        quickActions: quickActions.map(({ id, label, link }) => ({
          id,
          title: label,
          url: link,
        })),
      });
    },
    [],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error, errorHandler);
    }
  }, [error, errorHandler]);

  const publishQuickActions = useCallback(
    async (quickActions: QuickAction[]) => {
      const response = await doPublishQuickActions(quickActions);
      if (response instanceof Error) return;

      push({ pathname: PATHS.CAUSE.url(causeId) });
      dispatch(
        updateSnackbar({
          message: formatMessage({ id: 'update_cause.success' }),
          severity: Severity.success,
        }),
      );
    },
    [causeId, dispatch, doPublishQuickActions, formatMessage, push],
  );

  return { loading, error, publishQuickActions };
};
