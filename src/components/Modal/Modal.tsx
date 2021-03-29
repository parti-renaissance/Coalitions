import Slide, { SlideProps } from '@material-ui/core/Slide';
import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { getIsMobile } from 'services/mobile/mobile';
import { StyledDialog, StyledCloseButton, StyledCloseIcon, ContentContainer } from './Modal.style';

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
    <StyledDialog
      fullScreen={isMobile}
      open={isOpened}
      TransitionComponent={isMobile ? SlideUp : undefined}
    >
      <StyledCloseButton onClick={onClose}>
        <StyledCloseIcon />
      </StyledCloseButton>
      <ContentContainer>{children}</ContentContainer>
    </StyledDialog>
  );
};
