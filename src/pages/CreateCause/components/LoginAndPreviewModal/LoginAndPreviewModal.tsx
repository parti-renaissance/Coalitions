import React, { FunctionComponent } from 'react';
import LoginModal from 'components/LoginModal';
import { useIntl } from 'react-intl';

interface LoginAndPreviewModalProps {
  isOpened: boolean;
  onClose: () => void;
}

const LoginAndPreviewModal: FunctionComponent<LoginAndPreviewModalProps> = ({
  isOpened,
  onClose,
}) => {
  const intl = useIntl();

  const onConnect = () => {
    // TODO
  };

  return (
    <LoginModal<{}>
      isOpened={isOpened}
      onClose={onClose}
      onConnect={onConnect}
      title={intl.formatMessage({ id: 'create_cause.create-account' })}
    />
  );
};

export default LoginAndPreviewModal;
