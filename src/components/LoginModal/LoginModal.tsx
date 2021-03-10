import React, { FunctionComponent, forwardRef, ForwardRefRenderFunction } from 'react';
import { getIsMobile } from '../../services/mobile/mobile';
import {
  StyledCloseButton,
  StyledCloseIcon,
  ContentContainer,
  Title,
  InputFieldWrapper,
  ValidateButtonContainer,
} from './LoginModal.style';
import { SlideProps } from '@material-ui/core/Slide';
import { Dialog, Slide } from '@material-ui/core';
import { useIntl } from 'react-intl';
import InputField from 'components/InputField';
import FixedBottomButton from 'components/FixedBottomButton';

interface LoginModalProps {
  isOpened: boolean;
  onClose: () => void;
  title: string;
  AdditionalFields: FunctionComponent<{}>;
}

const SlideUpComponent: ForwardRefRenderFunction<{}, SlideProps> = (props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
);

const SlideUp = forwardRef<{}, SlideProps>(SlideUpComponent);

const LoginModal: FunctionComponent<LoginModalProps> = ({
  isOpened,
  onClose,
  title,
  AdditionalFields,
}) => {
  const isMobile = getIsMobile();
  const intl = useIntl();

  const onValidateClick = () => {
    // TODO
  };

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
        <Title>{title}</Title>
        <InputFieldWrapper>
          <InputField placeholder={intl.formatMessage({ id: 'login_modal.first-name' })} />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <InputField placeholder={intl.formatMessage({ id: 'login_modal.email-address' })} />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <InputField placeholder={intl.formatMessage({ id: 'login_modal.city-or-country' })} />
        </InputFieldWrapper>
        <AdditionalFields />
        <ValidateButtonContainer>
          <FixedBottomButton
            label={intl.formatMessage({ id: 'login_modal.validate' })}
            onClick={onValidateClick}
          />
        </ValidateButtonContainer>
      </ContentContainer>
    </Dialog>
  );
};

export default LoginModal;
