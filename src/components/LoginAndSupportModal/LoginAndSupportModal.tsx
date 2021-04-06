import React, { FunctionComponent } from 'react';
import LoginModal from 'components/LoginModal';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Cause as CauseType } from 'redux/Cause/types';
import { setAfterAuthFollowCause, setAfterAuthRedirect } from 'redux/Login/slice';
import { useUnauthenticatedCauseFollow } from 'redux/Cause/hooks/useUnauthenticatedCauseFollow';

interface LoginAndSupportModalProps {
  isOpened: boolean;
  onClose: () => void;
  cause: CauseType;
  redirectToAfterAuth?: string;
}

const LoginAndSupportModal: FunctionComponent<LoginAndSupportModalProps> = ({
  isOpened,
  onClose,
  cause,
  redirectToAfterAuth = '',
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { loading: isFollowingCause, unauthenticatedCauseFollow } = useUnauthenticatedCauseFollow(
    cause.uuid,
    onClose,
  );

  const onConnect = () => {
    dispatch(setAfterAuthFollowCause(cause.uuid));
    if (redirectToAfterAuth !== '') {
      dispatch(setAfterAuthRedirect(redirectToAfterAuth));
    }
  };

  return (
    <LoginModal
      isOpened={isOpened}
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
