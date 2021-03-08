import React, { FunctionComponent, forwardRef, ForwardRefRenderFunction } from 'react';
import { getIsMobile } from '../../services/mobile/mobile';
import { StyledCloseButton, StyledCloseIcon, ContentContainer } from './LoginModal.style';
import { SlideProps } from '@material-ui/core/Slide';
import { Dialog, Slide } from '@material-ui/core';

interface LoginModalProps {
  isOpened: boolean;
  onClose: () => void;
}

const SlideUpComponent: ForwardRefRenderFunction<{}, SlideProps> = (props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
);

const SlideUp = forwardRef<{}, SlideProps>(SlideUpComponent);

const LoginModal: FunctionComponent<LoginModalProps> = ({ isOpened, onClose }) => {
  const isMobile = getIsMobile();

  return (
    <Dialog
      fullScreen={isMobile}
      open={isOpened}
      TransitionComponent={isMobile ? SlideUp : undefined}
    >
      <ContentContainer>
        <StyledCloseButton onClick={onClose}>
          <StyledCloseIcon />
        </StyledCloseButton>
      </ContentContainer>
    </Dialog>
  );
};

export default LoginModal;
