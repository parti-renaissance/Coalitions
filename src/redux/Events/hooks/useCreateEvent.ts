import { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { updateSnackbar } from 'redux/Snackbar';
import { Severity } from 'redux/Snackbar/types';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { PATHS } from 'routes';
import HandleErrorService, { APIErrorsType, doesErrorIncludes } from 'services/HandleErrorService';
import { InCreationEventType } from '../types';

const useCreateEventErrorHandler = () => {
  const { formatMessage } = useIntl();

  return useCallback(
    (error?: APIErrorsType) => {
      if (error instanceof Response || error === undefined || error.message === undefined) {
        return null;
      }
      if (doesErrorIncludes(error, 'name: Cette valeur est déjà utilisée')) {
        return formatMessage({ id: 'errors.already-used-event-name' });
      }
      return null;
    },
    [formatMessage],
  );
};

export const useCreateEvent = () => {
  const { push } = useHistory();
  const errorHandler = useCreateEventErrorHandler();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const [{ loading, error }, doCreateEvent] = useTypedAsyncFn(
    async (event: InCreationEventType) => {
      console.log({ event });
      return new Promise(resolve =>
        setTimeout(resolve, 2000, { uuid: '773da575-d7a0-4468-8591-d0fc8d700de3' }),
      );
      // return await authenticatedApiClient.post(`v3/causes/${cause.uuid}/image`, {
      //   content: cause?.image_url,
      // });
    },
    [],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error, errorHandler);
    }
  }, [error, errorHandler]);

  const createEvent = useCallback(
    async (event: InCreationEventType) => {
      console.log({ event });
      const response = await doCreateEvent(event);

      if (response instanceof Error) return;

      if (response.uuid !== undefined) {
        push({ pathname: PATHS.CAUSE.url('test'), search: `?eventId=${response.uuid}` });
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
