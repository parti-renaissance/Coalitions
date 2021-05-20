import { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
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

  const [{ loading, error }, doCreateEvent] = useTypedAsyncFn(
    async (event: InCreationEventType) => {
      setTimeout(() => {}, 3000);

      return await Promise.resolve(console.log({ event }));
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

      push({ pathname: PATHS.CAUSE.url('test'), search: `?createdEvent=true` });
    },
    [doCreateEvent, push],
  );

  return { loading, error, createEvent };
};
