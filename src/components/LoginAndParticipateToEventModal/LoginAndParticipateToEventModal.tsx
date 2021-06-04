import React, { FunctionComponent } from 'react';
import LoginModal from 'components/LoginModal';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { closeEventParticipateModal } from 'redux/Events';
import { getEventParticipateModal } from 'redux/Events/selectors';
import { setAfterAuthParticipateToEvent, setAfterAuthRedirect } from 'redux/Login';
import { PATHS } from 'routes';
import { useUnauthenticatedEventParticipate } from 'redux/Events/hooks/useUnauthenticatedEventParticipate';

const LoginAndParticipateToEventModal: FunctionComponent = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const event = useSelector(getEventParticipateModal);
  const onClose = () => {
    dispatch(closeEventParticipateModal());
  };
  const { loading, unauthenticatedEventParticipate } = useUnauthenticatedEventParticipate(onClose);

  let redirectToAfterAuth: null | string = null;
  if (event !== null) {
    const search = `?eventId=${event.uuid}`;
    if (window.location.pathname === PATHS.HOME.url()) {
      if (event.cause !== undefined) {
        redirectToAfterAuth = `${PATHS.CAUSE.url(event.cause.slug)}${search}`;
      } else if (event.coalition !== undefined) {
        redirectToAfterAuth = `${PATHS.COALITION.url(event.coalition.uuid)}${search}`;
      }
    } else {
      redirectToAfterAuth = `${window.location.pathname}${search}`;
    }
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
      onAccountFormSubmit={unauthenticatedEventParticipate}
      doingAfterAccountCreation={loading}
    />
  );
};

export default LoginAndParticipateToEventModal;
