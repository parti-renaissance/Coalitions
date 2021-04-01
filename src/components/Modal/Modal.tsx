import Slide, { SlideProps } from '@material-ui/core/Slide';
import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { getIsMobile } from 'services/mobile/mobile';
import { Container, CloseButton, CloseIcon } from './Modal.style';

type ModalProps = {
  isOpened: boolean;
  onClose: () => void;
};

const SlideUpComponent: ForwardRefRenderFunction<{}, SlideProps> = (props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
);

const SlideUp = forwardRef<{}, SlideProps>(SlideUpComponent);

export const Modal: React.FunctionComponent<ModalProps> = ({ children, isOpened, onClose }) => {
  const isMobile = getIsMobile();

  return (
    <Container
      fullScreen={isMobile}
      open={isOpened}
      TransitionComponent={isMobile ? SlideUp : undefined}
    >
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>
      {children}
    </Container>
  );
};
