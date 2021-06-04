import { useCallback, useEffect } from 'react';
import { InscriptionFormValues } from 'components/LoginModal/components/CreateAccountForm/lib/useValidateForm';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { updateSnackbar } from 'redux/Snackbar';
import { Severity } from 'redux/Snackbar/types';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import HandleErrorService, { APIErrorsType, doesErrorIncludes } from 'services/HandleErrorService';
import { coalitionApiClient } from 'services/networking/client';
import { optimisticallyIncrementEventParticipants } from '../slice';
import { getEventParticipateModal } from '../selectors';

const useUnauthenticatedEventParticipateErrorHandler = () => {
  const { formatMessage } = useIntl();

  return useCallback(
    (error?: APIErrorsType) => {
      if (error instanceof Response || error === undefined || error.message === undefined) {
        return null;
      }
      if (doesErrorIncludes(error, "Vous êtes déjà inscrit(e) à l'événement")) {
        return formatMessage({ id: 'errors.mail-of-existing-account-for-event-participate' });
      }
      return null;
    },
    [formatMessage],
  );
};

type UnauthenticatedEventParticipatePayload = {
  email_address: string;
  first_name: string;
  last_name: string;
};

export const useUnauthenticatedEventParticipate = (onClose?: () => void) => {
  const dispatch = useDispatch();
  const event = useSelector(getEventParticipateModal);
  const eventId = event !== null ? event.uuid : '';
  const { formatMessage } = useIntl();
  const errorHandler = useUnauthenticatedEventParticipateErrorHandler();

  const [{ loading, error }, doUnauthenticatedEventParticipate] = useTypedAsyncFn(
    async (payload: UnauthenticatedEventParticipatePayload) => {
      await coalitionApiClient.post(`events/${eventId}/subscribe`, {
        ...payload,
      });
    },
    [eventId],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error, errorHandler);
    }
  }, [error, errorHandler]);

  const unauthenticatedEventParticipate = useCallback(
    async (values: InscriptionFormValues) => {
      if (loading) {
        return;
      }
      const response = await doUnauthenticatedEventParticipate({
        email_address: values.email !== undefined ? values.email : '',
        first_name: values.firstName !== undefined ? values.firstName : '',
        last_name: values.lastName !== undefined ? values.lastName : '',
      });

      if (response instanceof Error) return;

      if (onClose !== undefined) {
        onClose();
      }

      dispatch(optimisticallyIncrementEventParticipants(eventId));
      dispatch(
        updateSnackbar({
          message: formatMessage({ id: 'login_modal.create_account.success' }),
          severity: Severity.success,
        }),
      );
    },
    [eventId, dispatch, doUnauthenticatedEventParticipate, formatMessage, loading, onClose],
  );

  return { loading, error, unauthenticatedEventParticipate };
};
