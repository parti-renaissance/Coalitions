import { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { updateSnackbar } from 'redux/Snackbar';
import { Severity } from 'redux/Snackbar/types';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { PATHS } from 'routes';
import HandleErrorService, { APIErrorsType, doesErrorIncludes } from 'services/HandleErrorService';
import { authenticatedApiClient } from 'services/networking/client';
import { RawUpdateEventType } from '../types';

const useUpdateEventErrorHandler = () => {
  const { formatMessage } = useIntl();

  return useCallback(
    (error?: APIErrorsType) => {
      if (error instanceof Response || error === undefined || error.message === undefined) {
        return null;
      }
      if (doesErrorIncludes(error, 'Access Denied')) {
        return formatMessage({ id: 'errors.cannot-edit-this-event' });
      }
      return null;
    },
    [formatMessage],
  );
};

export const useUpdateEvent = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const errorHandler = useUpdateEventErrorHandler();

  const [{ loading, error }, doUpdateEvent] = useTypedAsyncFn(async (event: RawUpdateEventType) => {
    return await authenticatedApiClient.put('v3/events', event);
  }, []);

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error, errorHandler);
    }
  }, [error, errorHandler]);

  const updateEvent = useCallback(
    async (event: RawUpdateEventType) => {
      const response = await doUpdateEvent(event);

      if (response instanceof Error) return;

      if (response.uuid !== undefined) {
        // TODO
        push({ pathname: PATHS.CAUSE.url('test'), search: `?eventId=${response.uuid}` });
        dispatch(
          updateSnackbar({
            message: formatMessage({ id: 'event_form.update.success' }),
            severity: Severity.success,
          }),
        );
      }
    },
    [dispatch, doUpdateEvent, formatMessage, push],
  );

  return { loading, error, updateEvent };
};
