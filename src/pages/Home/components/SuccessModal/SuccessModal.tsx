import React, { FunctionComponent, useEffect, useState } from 'react';
import SuccessModalContent from 'components/SuccessModalContent';
import { Modal } from 'components/Modal/Modal';
import { useHistory, useLocation } from 'react-router';

const SuccessModal: FunctionComponent<{}> = () => {
  const location = useLocation();
  const history = useHistory();
  const [config, setConfig] = useState<
    { imageUrl: string; titleKey: string; contentKey?: string } | undefined
  >(undefined);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const publishedCause = params.get('publishedCause');
    const didCreateAccount = params.get('didCreateAccount');
    const sendMail = params.get('sendMail');

    if (publishedCause !== null) {
      setConfig({
        imageUrl: '/images/publishCause.svg',
        titleKey: 'home.published_cause_modal.title',
        contentKey: 'home.published_cause_modal.content',
      });
    } else if (didCreateAccount !== null) {
      setConfig({
        imageUrl: '/images/createAccount.svg',
        titleKey: 'login_modal.success_screen.title',
        contentKey: 'login_modal.success_screen.text',
      });
    } else if (sendMail !== null) {
      setConfig({
        imageUrl: '/images/sendMail.svg',
        titleKey: 'send_mails.success_screen.title',
      });
    }
  }, [location]);

  const onClose = () => {
    setConfig(undefined);
    history.replace({ search: '' });
  };

  return (
    <Modal isOpened={config !== undefined} onClose={onClose}>
      {config !== undefined && (
        <SuccessModalContent
          imageUrl={config.imageUrl}
          titleKey={config.titleKey}
          contentKey={config.contentKey}
        />
      )}
    </Modal>
  );
};

export default SuccessModal;
