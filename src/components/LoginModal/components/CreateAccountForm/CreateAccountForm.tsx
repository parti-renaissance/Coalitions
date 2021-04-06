/* eslint-disable max-lines */

import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { useIntl, FormattedMessage } from 'react-intl';
import InputField from 'components/InputField';
import Formik from 'components/Formik';
import { useValidateForm, InscriptionFormValues } from './lib/useValidateForm';
import {
  useCityAndCountryAutocomplete,
  CityOrCountry,
  getCityOrCountryLabel,
} from './lib/useCityAndCountryAutocomplete';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FullWidthButton } from 'components/Button/Button';
import { useCreateAccount } from './useCreateAccount';
import { InputFieldWrapper } from 'components/InputField/InputField.style';
import { Label, Asterisk } from 'components/IconAndLabel/IconAndLabel.style';
import { ModalCheckbox } from 'components/Modal/ModalCheckbox';
import {
  Container,
  Title,
  Connect,
  ConnectLink,
  ValidateButtonContainer,
  LegalText,
} from './CreateAccountForm.style';
import { oauthUrl } from 'services/networking/auth';
import { CHARTER_OF_VALUES_URL } from 'routes';

interface CreateAccountFormProps {
  doAfterAccountCreation?: () => Promise<void>;
  onAccountFormSubmit?: (values: InscriptionFormValues) => Promise<void>;
  doingAfterAccountCreation?: boolean;
  isInPage?: boolean;
  title: string;
  onConnect?: () => void;
  legalTextKey: string;
}

const CreateAccountForm = ({
  doAfterAccountCreation,
  doingAfterAccountCreation,
  isInPage = false,
  onAccountFormSubmit,
  title,
  onConnect,
  legalTextKey,
}: CreateAccountFormProps) => {
  const intl = useIntl();
  const { validateForm } = useValidateForm();
  const { cities, fetchCities, isFetchingCities } = useCityAndCountryAutocomplete();
  const { loading, createAccount } = useCreateAccount(doAfterAccountCreation);

  const handleAccountCreation = async (values: InscriptionFormValues) => {
    if (onAccountFormSubmit !== undefined) {
      onAccountFormSubmit(values);
    } else {
      await createAccount(values);
    }
  };

  const onConnectClick = () => {
    if (onConnect !== undefined) {
      onConnect();
    }
    window.location.href = oauthUrl;
  };

  return (
    <Container isInPage={isInPage}>
      <Title>{title}</Title>
      <Connect>
        <div>{intl.formatMessage({ id: 'login_modal.signed-up' })}</div>
        <ConnectLink onClick={onConnectClick}>
          <FormattedMessage id="login_modal.connect" />
        </ConnectLink>
      </Connect>
      <Formik<InscriptionFormValues>
        initialValues={{} as InscriptionFormValues}
        validate={validateForm}
        onSubmit={handleAccountCreation}
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
                          {isFetchingCities ? <CircularProgress color="primary" size={20} /> : null}
                          {params?.InputProps?.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </InputFieldWrapper>
            <ModalCheckbox
              handleChange={handleChange}
              value={values.causeMailAgreement}
              name="causeMailAgreement"
              label={<Label>{intl.formatMessage({ id: 'inscription.agree-mail-cause' })}</Label>}
            />
            <ModalCheckbox
              handleChange={handleChange}
              value={values.coalitionMailAgreement}
              name="coalitionMailAgreement"
              label={
                <Label>{intl.formatMessage({ id: 'inscription.agree-mail-coalition' })}</Label>
              }
            />
            <ModalCheckbox
              handleChange={handleChange}
              value={values.cguAgreement}
              name="cguAgreement"
              label={
                <Label>
                  {intl.formatMessage(
                    { id: 'inscription.agree-cgu' },
                    {
                      charterOfValue: (
                        <a href={CHARTER_OF_VALUES_URL} target="_blank">
                          <FormattedMessage id="inscription.charter-of-values" />
                        </a>
                      ),
                    },
                  )}
                  <Asterisk>*</Asterisk>
                </Label>
              }
            />
            <LegalText>{intl.formatMessage({ id: legalTextKey })}</LegalText>
            <ValidateButtonContainer isInPage={isInPage}>
              <FullWidthButton
                disabled={
                  isSubmitting ||
                  Object.keys(errors).length > 0 ||
                  touched.firstName !== true ||
                  touched.email !== true ||
                  touched.cityId !== true
                }
                type="submit"
                size="small"
                variant="contained"
                color="primary"
                isLoading={loading || doingAfterAccountCreation}
              >
                {intl.formatMessage({ id: 'login_modal.validate' })}
              </FullWidthButton>
            </ValidateButtonContainer>
          </form>
        )}
      </Formik>
    </Container>
  );
};
export default CreateAccountForm;

/* eslint-enable max-lines */
