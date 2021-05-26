import React, { FunctionComponent } from 'react';
import LoginModal from 'components/LoginModal';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { closeEventParticipateModal } from 'redux/Events';
import { getEventParticipateModal } from 'redux/Events/selectors';
import { setAfterAuthParticipateToEvent, setAfterAuthRedirect } from 'redux/Login';
import { PATHS } from 'routes';

const LoginAndParticipateToEventModal: FunctionComponent = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const event = useSelector(getEventParticipateModal);

  const onClose = () => {
    dispatch(closeEventParticipateModal());
  };

  const redirectToAfterAuth =
    event !== null ? `${PATHS.CAUSE.url(event.causeId)}?eventId=${event.uuid}` : null;

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
    />
  );
};

export default LoginAndParticipateToEventModal;
