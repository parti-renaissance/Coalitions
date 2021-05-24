import Slide, { SlideProps } from '@material-ui/core/Slide';
import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { getIsMobile } from 'services/mobile/mobile';
import {
  SmallContainer,
  MediumContainer,
  CloseButton,
  CloseIcon,
  LargeContainer,
} from './Modal.style';

type ModalProps = {
  isOpened: boolean;
  onClose: () => void;
  shouldDisplayCloseIcon?: boolean;
  width?: 'large' | 'medium' | 'small';
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
  width = 'small',
}) => {
  const isMobile = getIsMobile();

  let ContainerComponent;
  switch (width) {
    case 'small':
      ContainerComponent = SmallContainer;
      break;
    case 'medium':
      ContainerComponent = MediumContainer;
      break;
    case 'large':
      ContainerComponent = LargeContainer;
      break;
    default:
      ContainerComponent = SmallContainer;
  }

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
