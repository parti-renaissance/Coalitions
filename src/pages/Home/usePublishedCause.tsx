import React, { useEffect, useState } from 'react';
import SuccessModalContent from 'components/SuccessModalContent';
import { Modal } from 'components/Modal/Modal';
import { useHistory, useLocation } from 'react-router';

export const usePublishedCause = () => {
  const location = useLocation();
  const history = useHistory();
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const publishedCause = params.get('publishedCause');
    if (publishedCause !== null) {
      setIsOpened(true);
    }
  }, [location]);

  const onClose = () => {
    setIsOpened(false);
    history.replace({ search: '' });
  };

  const renderSuccessModal = () => (
    <Modal isOpened={isOpened} onClose={onClose}>
      <SuccessModalContent
        imageUrl="/images/createCause.jpg"
        titleKey="home.published_cause_modal.title"
        contentKey="home.published_cause_modal.content"
      />
    </Modal>
  );

  return { renderSuccessModal };
};
