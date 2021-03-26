import React, { useState } from 'react';
import { Title } from 'components/Modal/Modal.style';
import { useFormik } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';
import { InputFieldWrapper, StyledFormControl } from 'components/InputField/InputField.style';
import { useValidatePasswordForm } from './services';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { IconButton, InputAdornment } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Visibility, VisibilityOff } from '@material-ui/icons';
//import { useParams } from 'react-router';
import { PasswordContainer, PasswordFormWrapper, SubmitButtonContainer } from './Password.style';
import { FullWidthButton } from 'components/Button/Button';

export type PasswordForm = {
  password: string;
  passwordConfirmation: string;
};

type PasswordQueryParams = {
  identifier: string;
  token: string;
};

//Todo Bastien : In next ticket refacto in an InputFieldWrapperPassword components do decrease complexity
// eslint-disable-next-line complexity
export const Password: React.FunctionComponent = () => {
  const { formatMessage } = useIntl();
  const { validateForm } = useValidatePasswordForm();
  const [showPassword, setShowPassword] = useState(false);
  //const { identifier, token } = useParams<PasswordQueryParams>();
  const formik = useFormik<PasswordForm>({
    initialValues: { password: '', passwordConfirmation: '' },
    validate: validateForm,
    onSubmit: () => {
      console.log('submit');
    },
  });

  return (
    <PasswordContainer>
      <PasswordFormWrapper>
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
              {formik.touched.password === true && formik.errors.password !== undefined ? (
                <FormHelperText>{formik.errors.password}</FormHelperText>
              ) : null}
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
              formik.errors.passwordConfirmation !== undefined ? (
                <FormHelperText>{formik.errors.passwordConfirmation}</FormHelperText>
              ) : null}
            </StyledFormControl>
          </InputFieldWrapper>
          <SubmitButtonContainer>
            <FullWidthButton
              disabled={
                formik.isSubmitting ||
                Object.keys(formik.errors).length > 0 ||
                formik.touched.password !== true ||
                formik.touched.passwordConfirmation !== true
              }
              type="submit"
              size="small"
              variant="contained"
              color="primary"
            >
              {formatMessage({ id: 'password_modal.submit' })}
            </FullWidthButton>
          </SubmitButtonContainer>
        </form>
      </PasswordFormWrapper>
    </PasswordContainer>
  );
};

export default Password;
