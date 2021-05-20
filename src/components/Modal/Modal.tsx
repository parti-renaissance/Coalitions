import Slide, { SlideProps } from '@material-ui/core/Slide';
import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { getIsMobile } from 'services/mobile/mobile';
import { Container, CloseButton, CloseIcon, LargeContainer } from './Modal.style';

type ModalProps = {
  isOpened: boolean;
  onClose: () => void;
  shouldDisplayCloseIcon?: boolean;
  large?: boolean;
};

const SlideUpComponent: ForwardRefRenderFunction<{}, SlideProps> = (props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
);

const SlideUp = forwardRef<{}, SlideProps>(SlideUpComponent);

export const Modal: React.FunctionComponent<ModalProps> = ({
  children,
  isOpened,
  onClose,
  shouldDisplayCloseIcon = true,
  large = false,
}) => {
  const isMobile = getIsMobile();
  const ContainerComponent = large === true ? LargeContainer : Container;

  return (
    <ContainerComponent
      fullScreen={isMobile}
      open={isOpened}
      TransitionComponent={isMobile ? SlideUp : undefined}
    >
      {shouldDisplayCloseIcon ? (
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      ) : null}
      {children}
    </ContainerComponent>
  );
};
