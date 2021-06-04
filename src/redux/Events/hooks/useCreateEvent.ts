import { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { updateSnackbar } from 'redux/Snackbar';
import { Severity } from 'redux/Snackbar/types';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { PATHS } from 'routes';
import HandleErrorService from 'services/HandleErrorService';
import { authenticatedApiClient } from 'services/networking/client';
import { adaptEvent } from '../helpers/adapter';
import { RawCreateEventType, RawEventType } from '../types';

export const useCreateEvent = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const [{ loading, error }, doCreateEvent] = useTypedAsyncFn(async (event: RawCreateEventType) => {
    return await authenticatedApiClient.post('v3/events', event);
  }, []);

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const createEvent = useCallback(
    async (event: RawCreateEventType) => {
      const response: RawEventType = await doCreateEvent(event);

      if (response instanceof Error) return;

      if (response.uuid !== undefined) {
        const event = adaptEvent(response);

        if (event.cause !== undefined) {
          push({ pathname: PATHS.CAUSE.url(event.cause.slug), search: `?eventId=${event.uuid}` });
        } else if (event.coalition !== undefined) {
          push({
            pathname: PATHS.COALITION.url(event.coalition.uuid),
            search: `?eventId=${event.uuid}`,
          });
        }
        dispatch(
          updateSnackbar({
            message: formatMessage({ id: 'event_form.create.success' }),
            severity: Severity.success,
          }),
        );
      }
    },
    [doCreateEvent, push, dispatch, formatMessage],
  );

  return { loading, error, createEvent };
};
