import React, { useEffect, useState } from 'react';
import SuccessModalContent from 'components/SuccessModalContent';
import { Modal } from 'components/Modal/Modal';
import { useHistory, useLocation } from 'react-router';

export const useSuccessModal = () => {
  const location = useLocation();
  const history = useHistory();
  const [config, setConfig] = useState<
    { imageUrl: string; titleKey: string; contentKey: string } | undefined
  >(undefined);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const publishedCause = params.get('publishedCause');
    const didCreateAccount = params.get('didCreateAccount');

    if (publishedCause !== null) {
      setConfig({
        imageUrl: '/images/createCause.svg',
        titleKey: 'home.published_cause_modal.title',
        contentKey: 'home.published_cause_modal.content',
      });
    } else if (didCreateAccount !== null) {
      setConfig({
        imageUrl: '/images/createCause.svg',
        titleKey: 'login_modal.success_screen.title',
        contentKey: 'login_modal.success_screen.text',
      });
    }
  }, [location]);

  const onClose = () => {
    setConfig(undefined);
    history.replace({ search: '' });
  };

  const renderSuccessModal = () => (
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

  return { renderSuccessModal };
};
