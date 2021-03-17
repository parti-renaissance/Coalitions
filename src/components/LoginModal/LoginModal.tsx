import React, { FunctionComponent, forwardRef, ForwardRefRenderFunction, ChangeEvent } from 'react';
import { getIsMobile } from 'services/mobile/mobile';
import {
  StyledCloseButton,
  StyledCloseIcon,
  ContentContainer,
  Title,
  InputFieldWrapper,
  ValidateButtonContainer,
  Connect,
  ConnectLink,
} from './LoginModal.style';
import { SlideProps } from '@material-ui/core/Slide';
import { Dialog, Slide, CircularProgress } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { FormattedMessage, useIntl } from 'react-intl';
import InputField from 'components/InputField';
import FixedBottomButton from 'components/FixedBottomButton';
import { Formik } from 'formik';
import { useValidateForm, FormValues } from './lib/useValidateForm';
import {
  useCityAndCountryAutocomplete,
  CityOrCountry,
  getCityOrCountryLabel,
} from './lib/useCityAndCountryAutocomplete';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { oauthUrl } from 'services/networking/auth';

interface LoginModalProps<OtherFormValues> {
  isOpened: boolean;
  onClose: () => void;
  onConnect: () => void;
  title: string;
  AdditionalFields: FunctionComponent<{
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
}: LoginModalProps<OtherFormValues>) => {
  const isMobile = getIsMobile();
  const intl = useIntl();
  const { validateForm } = useValidateForm<OtherFormValues>();
  const { cities, fetchCities, isFetchingCities } = useCityAndCountryAutocomplete();

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
        <Connect>
          <FormattedMessage id="login_modal.signed-up" />
          <ConnectLink onClick={onConnect} href={oauthUrl}>
            <FormattedMessage id="login_modal.connect" />
          </ConnectLink>
        </Connect>
        <Formik
          initialValues={{} as FormValues & OtherFormValues}
          validate={validateForm}
          onSubmit={onValidateClick}
        >
          {// eslint-disable-next-line complexity
          ({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            touched,
            setFieldValue,
            setFieldTouched,
          }) => (
            <form onSubmit={handleSubmit}>
              <InputFieldWrapper>
                <InputField
                  placeholder={intl.formatMessage({ id: 'login_modal.first-name' })}
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  error={touched.firstName === true && errors.firstName !== undefined}
                  helperText={touched.firstName === true ? errors.firstName : undefined}
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
                  error={touched.email === true && errors.email !== undefined}
                  helperText={touched.email === true ? errors.email : undefined}
                />
              </InputFieldWrapper>
              <InputFieldWrapper>
                <Autocomplete
                  freeSolo
                  options={cities}
                  getOptionLabel={getCityOrCountryLabel}
                  onBlur={() => setFieldTouched('cityId', true)}
                  onChange={(e, value) => {
                    setFieldValue('cityId', (value as CityOrCountry)?.uuid || '');
                  }}
                  renderInput={(params: TextFieldProps) => (
                    <InputField
                      {...params}
                      placeholder={intl.formatMessage({ id: 'login_modal.city-or-country' })}
                      error={touched.cityId === true && errors.cityId !== undefined}
                      helperText={touched.cityId === true ? errors.cityId : undefined}
                      onChange={e => {
                        handleChange(e);
                        setFieldValue('cityId', '');
                        fetchCities(e.target.value);
                      }}
                      onBlur={handleBlur}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isFetchingCities ? (
                              <CircularProgress color="primary" size={20} />
                            ) : null}
                            {params?.InputProps?.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </InputFieldWrapper>
              <AdditionalFields onChange={handleChange} values={values} />
              <ValidateButtonContainer>
                <FixedBottomButton
                  disabled={
                    isSubmitting ||
                    Object.keys(errors).length > 0 ||
                    touched.firstName !== true ||
                    touched.email !== true ||
                    touched.cityId !== true
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
