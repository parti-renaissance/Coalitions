import React, { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { Title, ValidateButtonContainer } from 'components/Modal/Modal.style';
import { useFormik } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';
import { InputFieldWrapper, StyledFormControl } from 'components/InputField/InputField.style';
import FixedBottomButton from 'components/FixedBottomButton/FixedBottomButton';
import { useValidatePasswordForm } from './services';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { IconButton, InputAdornment } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Visibility, VisibilityOff } from '@material-ui/icons';

type PasswordModalProps = {
  token: string;
  isOpened: boolean;
  onClose: () => void;
};

export type PasswordForm = {
  password: string;
  passwordConfirmation: string;
};

export const PasswordModal: React.FunctionComponent<PasswordModalProps> = ({
  token,
  isOpened,
  onClose,
}) => {
  const { formatMessage } = useIntl();
  const { validateForm } = useValidatePasswordForm();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik<PasswordForm>({
    initialValues: { password: '', passwordConfirmation: '' },
    validate: validateForm,
    onSubmit: () => {},
  });

  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <Title>
        <FormattedMessage id="password_modal.title" />
      </Title>
      <form onSubmit={formik.handleSubmit}>
        <InputFieldWrapper>
          <StyledFormControl
            error={formik.touched.password === true && formik.errors.password !== undefined}
          >
            <OutlinedInput
              placeholder={formatMessage({ id: 'password_modal.password' })}
              type={showPassword ? 'text' : 'password'}
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {formik.touched.password === true && formik.errors.password !== undefined && (
              <FormHelperText>{formik.errors.password}</FormHelperText>
            )}
          </StyledFormControl>
        </InputFieldWrapper>
        <InputFieldWrapper>
          <StyledFormControl
            error={
              formik.touched.passwordConfirmation === true &&
              formik.errors.passwordConfirmation !== undefined
            }
          >
            <OutlinedInput
              placeholder={formatMessage({ id: 'password_modal.password-confirm' })}
              type={showPassword ? 'text' : 'password'}
              name="passwordConfirmation"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordConfirmation}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {formik.touched.passwordConfirmation === true &&
              formik.errors.passwordConfirmation !== undefined && (
                <FormHelperText>{formik.errors.passwordConfirmation}</FormHelperText>
              )}
          </StyledFormControl>
        </InputFieldWrapper>
        <ValidateButtonContainer>
          <FixedBottomButton
            disabled={
              formik.isSubmitting ||
              Object.keys(formik.errors).length > 0 ||
              formik.touched.password !== true ||
              formik.touched.passwordConfirmation !== true
            }
            type="submit"
          >
            {formatMessage({ id: 'password_modal.submit' })}
          </FixedBottomButton>
        </ValidateButtonContainer>
      </form>
    </Modal>
  );
};
