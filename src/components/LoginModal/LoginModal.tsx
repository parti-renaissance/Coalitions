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
import { Formik } from 'formik';
import { useValidateForm } from './lib/useValidateForm';

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
  const { validateForm } = useValidateForm();

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
        <Formik initialValues={{}} validate={validateForm} onSubmit={onValidateClick}>
          {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <InputFieldWrapper>
                <InputField
                  placeholder={intl.formatMessage({ id: 'login_modal.first-name' })}
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </InputFieldWrapper>
              <InputFieldWrapper>
                <InputField
                  placeholder={intl.formatMessage({ id: 'login_modal.email-address' })}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </InputFieldWrapper>
              <InputFieldWrapper>
                <InputField
                  placeholder={intl.formatMessage({ id: 'login_modal.city-or-country' })}
                  type="text"
                  name="city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  error={!!errors.city}
                  helperText={errors.city}
                />
              </InputFieldWrapper>
              <AdditionalFields />
              <ValidateButtonContainer>
                <FixedBottomButton
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  type="submit"
                >
                  {intl.formatMessage({ id: 'login_modal.validate' })}
                </FixedBottomButton>
              </ValidateButtonContainer>
            </form>
          )}
        </Formik>
      </ContentContainer>
    </Dialog>
  );
};

export default LoginModal;
