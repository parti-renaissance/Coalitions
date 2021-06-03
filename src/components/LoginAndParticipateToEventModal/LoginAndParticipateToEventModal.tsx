import React, { FunctionComponent } from 'react';
import LoginModal from 'components/LoginModal';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { closeEventParticipateModal } from 'redux/Events';
import { getEventParticipateModal } from 'redux/Events/selectors';
import { setAfterAuthParticipateToEvent, setAfterAuthRedirect } from 'redux/Login';
import { PATHS } from 'routes';
import { InscriptionFormValues } from 'components/LoginModal/components/CreateAccountForm/lib/useValidateForm';

const LoginAndParticipateToEventModal: FunctionComponent = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const event = useSelector(getEventParticipateModal);

  const onClose = () => {
    dispatch(closeEventParticipateModal());
  };

  let redirectToAfterAuth: null | string = null;
  if (event !== null && (event.cause !== undefined || event.coalition !== undefined)) {
    if (event.cause !== undefined) {
      redirectToAfterAuth = PATHS.CAUSE.url(event.cause.slug);
    } else if (event.coalition !== undefined) {
      redirectToAfterAuth = PATHS.COALITION.url(event.coalition.uuid);
    }
    redirectToAfterAuth = `${redirectToAfterAuth}?eventId=${event.uuid}`;
  }

  const onConnect = () => {
    dispatch(setAfterAuthParticipateToEvent(event !== null ? event.uuid : ''));
    if (redirectToAfterAuth !== null) {
      dispatch(setAfterAuthRedirect(redirectToAfterAuth));
    }
  };

  return (
    <LoginModal
      isOpened={event !== null}
      onClose={onClose}
      onConnect={onConnect}
      title={intl.formatMessage({ id: 'events.confirm-participation' })}
      legalTextKey="events.legal-inscription-text"
      isInEventFlow
      onAccountFormSubmit={(values: InscriptionFormValues) => {
        console.log(values);
        onClose();
        return Promise.resolve();
      }}
    />
  );
};

export default LoginAndParticipateToEventModal;
