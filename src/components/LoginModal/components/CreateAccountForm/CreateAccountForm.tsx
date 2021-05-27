/* eslint-disable max-lines */

import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import InputField from 'components/InputField';
import Formik from 'components/Formik';
import { useValidateForm, InscriptionFormValues } from './lib/useValidateForm';
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
import CityAutocomplete from 'components/CityAutocomplete';

interface CreateAccountFormProps {
  doAfterAccountCreation?: () => Promise<void>;
  onAccountFormSubmit?: (values: InscriptionFormValues) => Promise<void>;
  doingAfterAccountCreation?: boolean;
  isInPage?: boolean;
  title: string;
  onConnect?: () => void;
  legalTextKey: string;
  isInEventFlow?: boolean;
}

const CreateAccountForm = ({
  doAfterAccountCreation,
  doingAfterAccountCreation,
  isInPage = false,
  onAccountFormSubmit,
  title,
  onConnect,
  legalTextKey,
  isInEventFlow,
}: CreateAccountFormProps) => {
  const intl = useIntl();
  const { validateForm } = useValidateForm();
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
        initialValues={
          { causeMailAgreement: true, coalitionMailAgreement: true } as InscriptionFormValues
        }
        validate={validateForm(isInEventFlow)}
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
                required
                placeholder={intl.formatMessage({ id: 'login_modal.first-name' })}
                type="text"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                error={touched.firstName === true && errors.firstName !== undefined}
                helperText={touched.firstName === true ? errors.firstName : undefined}
                inputProps={{ maxLength: 50 }}
                InputLabelProps={{ required: false }}
              />
            </InputFieldWrapper>
            {isInEventFlow === true ? (
              <InputFieldWrapper>
                <InputField
                  required
                  placeholder={intl.formatMessage({ id: 'login_modal.last-name' })}
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  error={touched.lastName === true && errors.lastName !== undefined}
                  helperText={touched.lastName === true ? errors.lastName : undefined}
                  inputProps={{ maxLength: 50 }}
                  InputLabelProps={{ required: false }}
                />
              </InputFieldWrapper>
            ) : null}
            <InputFieldWrapper>
              <InputField
                required
                placeholder={intl.formatMessage({ id: 'login_modal.email-address' })}
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email === true && errors.email !== undefined}
                helperText={touched.email === true ? errors.email : undefined}
                inputProps={{ maxLength: 255 }}
                InputLabelProps={{ required: false }}
              />
            </InputFieldWrapper>
            {isInEventFlow !== true ? (
              <>
                <InputFieldWrapper>
                  <CityAutocomplete
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    errors={errors}
                  />
                </InputFieldWrapper>
                <ModalCheckbox
                  handleChange={handleChange}
                  value={values.causeMailAgreement}
                  name="causeMailAgreement"
                  label={
                    <Label>{intl.formatMessage({ id: 'inscription.agree-mail-cause' })}</Label>
                  }
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
                          charterOfValues: (
                            <a
                              href={CHARTER_OF_VALUES_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FormattedMessage id="inscription.charter-of-values" />
                            </a>
                          ),
                        },
                      )}
                      <Asterisk>*</Asterisk>
                    </Label>
                  }
                />
              </>
            ) : (
              <ModalCheckbox
                handleChange={handleChange}
                value={values.dataShareAgreement}
                name="dataShareAgreement"
                label={
                  <Label>
                    {intl.formatMessage({ id: 'events.data-share-agreement' })}
                    <Asterisk>*</Asterisk>
                  </Label>
                }
              />
            )}
            <ValidateButtonContainer isInPage={isInPage}>
              <FullWidthButton
                disabled={
                  isSubmitting ||
                  Object.keys(errors).length > 0 ||
                  touched.firstName !== true ||
                  touched.email !== true ||
                  (isInEventFlow === true ? touched.lastName !== true : touched.cityId !== true)
                }
                type="submit"
                size="small"
                variant="contained"
                color="primary"
                isLoading={loading || Boolean(doingAfterAccountCreation)}
              >
                {intl.formatMessage({ id: 'login_modal.validate' })}
              </FullWidthButton>
            </ValidateButtonContainer>
            <LegalText>{intl.formatMessage({ id: legalTextKey })}</LegalText>
          </form>
        )}
      </Formik>
    </Container>
  );
};
export default CreateAccountForm;

/* eslint-enable max-lines */
