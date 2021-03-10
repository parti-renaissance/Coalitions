import React, { FunctionComponent, forwardRef, ForwardRefRenderFunction, ChangeEvent } from 'react';
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
import { useValidateForm, FormValues } from './lib/useValidateForm';

interface LoginModalProps<OtherFormValues> {
  isOpened: boolean;
  onClose: () => void;
  title: string;
  AdditionalFields: FunctionComponent<{
    onChange: (e: ChangeEvent<any>) => void;
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
  title,
  AdditionalFields,
}: LoginModalProps<OtherFormValues>) => {
  const isMobile = getIsMobile();
  const intl = useIntl();
  const { validateForm } = useValidateForm<OtherFormValues>();

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
        <Formik
          initialValues={{} as FormValues & OtherFormValues}
          validate={validateForm}
          onSubmit={onValidateClick}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting, touched }) => (
            <form onSubmit={handleSubmit}>
              <InputFieldWrapper>
                <InputField
                  placeholder={intl.formatMessage({ id: 'login_modal.first-name' })}
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  error={touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
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
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
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
                  error={touched.city && !!errors.city}
                  helperText={touched.city && errors.city}
                />
              </InputFieldWrapper>
              <AdditionalFields onChange={handleChange} values={values} />
              <ValidateButtonContainer>
                <FixedBottomButton
                  disabled={
                    isSubmitting ||
                    Object.keys(errors).length > 0 ||
                    !touched.firstName ||
                    !touched.email ||
                    !touched.city
                  }
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
