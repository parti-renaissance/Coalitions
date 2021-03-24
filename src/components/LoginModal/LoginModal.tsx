import React, {
  FunctionComponent,
  forwardRef,
  ForwardRefRenderFunction,
  ChangeEvent,
  useState,
} from 'react';
import { getIsMobile } from 'services/mobile/mobile';
import {
  StyledCloseButton,
  StyledCloseIcon,
  ContentContainer,
  Title,
  Connect,
  ConnectLink,
  StyledDialog,
  SuccessImage,
  SuccessText,
  SuccessContainer,
} from './LoginModal.style';
import { SlideProps } from '@material-ui/core/Slide';
import { Slide } from '@material-ui/core';
import { FormattedMessage, useIntl } from 'react-intl';
import { FormValues } from './components/CreateAccountForm/lib/useValidateForm';
import { oauthUrl } from 'services/networking/auth';
import CreateAccountForm from './components/CreateAccountForm';

interface LoginModalProps<OtherFormValues> {
  isOpened: boolean;
  onClose: () => void;
  onConnect: () => void;
  title: string;
  showSuccessScreenOnValidate?: boolean;
  AdditionalFields?: FunctionComponent<{
    onChange: (e: ChangeEvent) => void;
    values: OtherFormValues & FormValues;
  }>;
}

const SlideUpComponent: ForwardRefRenderFunction<{}, SlideProps> = (props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
);

const SlideUp = forwardRef<{}, SlideProps>(SlideUpComponent);

const LoginModal = <OtherFormValues,>({
  isOpened,
  onClose,
  onConnect,
  title,
  AdditionalFields,
  showSuccessScreenOnValidate,
}: LoginModalProps<OtherFormValues>) => {
  const isMobile = getIsMobile();
  const intl = useIntl();
  const [showSuccessScreen, setShowSuccessScreen] = useState<boolean>(false);

  const onValidate = () => {
    if (showSuccessScreenOnValidate === true) {
      setShowSuccessScreen(true);
    } else {
      onClose();
    }
  };

  const onConnectClick = () => {
    onConnect();
    window.location.href = oauthUrl;
  };

  const renderContent = () => {
    if (showSuccessScreen) {
      return (
        <SuccessContainer>
          <SuccessImage src="/images/createCause.jpg" />
          <Title>{intl.formatMessage({ id: 'login_modal.success_screen.title' })}</Title>
          <SuccessText>{intl.formatMessage({ id: 'login_modal.success_screen.text' })}</SuccessText>
        </SuccessContainer>
      );
    }

    return (
      <>
        <Title>{title}</Title>
        <Connect>
          <p>{intl.formatMessage({ id: 'login_modal.signed-up' })}</p>
          <ConnectLink onClick={onConnectClick}>
            <FormattedMessage id="login_modal.connect" />
          </ConnectLink>
        </Connect>
        <CreateAccountForm<OtherFormValues>
          onValidate={onValidate}
          AdditionalFields={AdditionalFields}
        />
      </>
    );
  };

  return (
    <StyledDialog
      fullScreen={isMobile}
      open={isOpened}
      TransitionComponent={isMobile ? SlideUp : undefined}
    >
      <StyledCloseButton onClick={onClose}>
        <StyledCloseIcon />
      </StyledCloseButton>
      <ContentContainer>{renderContent()}</ContentContainer>
    </StyledDialog>
  );
};

export default LoginModal;
