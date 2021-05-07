import React, { FunctionComponent } from 'react';
import LoginModal from 'components/LoginModal';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { setAfterAuthFollowCause, setAfterAuthRedirect } from 'redux/Login/slice';
import { useUnauthenticatedCauseFollow } from 'redux/Cause/hooks/useUnauthenticatedCauseFollow';
import { closeCauseSupportModal } from 'redux/Cause';
import { getCauseSupportModal } from 'redux/Cause/selectors';
import { PATHS } from 'routes';

const LoginAndSupportModal: FunctionComponent = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const cause = useSelector(getCauseSupportModal);
  const onClose = () => {
    dispatch(closeCauseSupportModal());
  };
  const redirectToAfterAuth = cause !== null ? PATHS.CAUSE.url(cause.slug) : '';
  const { loading: isFollowingCause, unauthenticatedCauseFollow } = useUnauthenticatedCauseFollow(
    onClose,
  );

  const onConnect = () => {
    dispatch(setAfterAuthFollowCause(cause !== null ? cause.uuid : ''));
    if (redirectToAfterAuth !== '') {
      dispatch(setAfterAuthRedirect(redirectToAfterAuth));
    }
  };

  return (
    <LoginModal
      isOpened={cause !== null}
      onClose={onClose}
      onConnect={onConnect}
      title={intl.formatMessage({ id: 'cause.confirm-support' })}
      doingAfterAccountCreation={isFollowingCause}
      onAccountFormSubmit={unauthenticatedCauseFollow}
      legalTextKey="cause.legal-inscription-text"
    />
  );
};

export default LoginAndSupportModal;
