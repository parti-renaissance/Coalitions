import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { optimisticallyMarkParticipateToEvent, optimisticallyRemoveEventParticipation } from '..';
import HandleErrorService, { APIErrorsType, doesErrorIncludes } from 'services/HandleErrorService';
import { useIntl } from 'react-intl';

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

  const [{ loading, error }, doParticipateToEvent] = useTypedAsyncFn(async () => {
    return new Promise(resolve => setTimeout(resolve, 2000, { uuid: id }));
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

    if (response.uuid !== undefined) {
      dispatch(optimisticallyMarkParticipateToEvent(id));
    }
  }, [dispatch, doParticipateToEvent, id, loading]);

  return { loading, participateToEvent };
};

export const useRemoveEventParticipation = (id: string) => {
  const dispatch = useDispatch();

  const [{ loading, error }, doRemoveEventParticipation] = useTypedAsyncFn(async () => {
    return new Promise(resolve => setTimeout(resolve, 2000));
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
