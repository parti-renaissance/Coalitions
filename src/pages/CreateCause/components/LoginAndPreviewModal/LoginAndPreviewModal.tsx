import React, { FunctionComponent } from 'react';
import LoginModal from 'components/LoginModal';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { PATHS } from 'routes';
import { setAfterAuthRedirect } from 'redux/Login/slice';

interface LoginAndPreviewModalProps {
  isOpened: boolean;
  onClose: () => void;
}

const LoginAndPreviewModal: FunctionComponent<LoginAndPreviewModalProps> = ({
  isOpened,
  onClose,
}) => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const onConnect = () => {
    dispatch(setAfterAuthRedirect(PATHS.CAUSE_PREVIEW.url()));
  };

  return (
    <LoginModal
      isOpened={isOpened}
      onClose={onClose}
      onConnect={onConnect}
      title={intl.formatMessage({ id: 'create_cause.create-account' })}
      showSuccessScreenOnValidate
    />
  );
};

export default LoginAndPreviewModal;
