import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { optimisticallyMarkParticipateToEvent, optimisticallyRemoveEventParticipation } from '..';
import HandleErrorService, { APIErrorsType, doesErrorIncludes } from 'services/HandleErrorService';
import { useIntl } from 'react-intl';
import { updateSnackbar } from 'redux/Snackbar';
import { Severity } from 'redux/Snackbar/types';
import { authenticatedApiClient } from 'services/networking/client';

const useEventParticipateErrorHandler = () => {
  const { formatMessage } = useIntl();

  return useCallback(
    (error?: APIErrorsType) => {
      if (error instanceof Response || error === undefined || error.message === undefined) {
        return null;
      }
      if (doesErrorIncludes(error, 'Cette valeur est déjà utilisée')) {
        return formatMessage({ id: 'errors.already-participate-to-this-event' });
      }
      return null;
    },
    [formatMessage],
  );
};

export const useEventParticipate = (id: string) => {
  const dispatch = useDispatch();
  const errorHandler = useEventParticipateErrorHandler();
  const { formatMessage } = useIntl();

  const [{ loading, error }, doParticipateToEvent] = useTypedAsyncFn(async () => {
    return await authenticatedApiClient.post(`v3/events/${id}/subscribe`, null);
  }, [id]);

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error, errorHandler);
    }
  }, [error, errorHandler]);

  const participateToEvent = useCallback(async () => {
    if (loading) {
      return;
    }

    const response = await doParticipateToEvent();

    if (response instanceof Error) {
      return;
    }

    dispatch(optimisticallyMarkParticipateToEvent(id));
    dispatch(
      updateSnackbar({
        message: formatMessage({ id: 'event_details.participate_success' }),
        severity: Severity.success,
      }),
    );
  }, [dispatch, doParticipateToEvent, id, loading, formatMessage]);

  return { loading, participateToEvent };
};

export const useRemoveEventParticipation = (id: string) => {
  const dispatch = useDispatch();

  const [{ loading, error }, doRemoveEventParticipation] = useTypedAsyncFn(async () => {
    return await authenticatedApiClient.delete(`v3/events/${id}/subscribe`, null);
  }, []);

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const removeEventParticipation = useCallback(async () => {
    const response = await doRemoveEventParticipation();

    if (response instanceof Error) {
      return;
    }

    dispatch(optimisticallyRemoveEventParticipation(id));
  }, [dispatch, doRemoveEventParticipation, id]);

  return { loading, removeEventParticipation };
};
