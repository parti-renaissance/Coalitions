import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { Container, GenderItem, AdherentText, Form } from './Profile.style';
import InputField from 'components/InputField';
import Formik from 'components/Formik';
import { FullWidthButton } from 'components/Button/Button';
import { InputFieldWrapper } from 'components/InputField/InputField.style';
import { ValidateButtonContainer } from 'components/LoginModal/components/CreateAccountForm/CreateAccountForm.style';
import { useValidateForm, ProfileFormValues, GENDERS } from './lib/useValidateForm';
import CityAutocomplete from 'components/CityAutocomplete';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'redux/User/selectors';
import isMatch from 'lodash/isMatch';

const UpdateEmProfileLink: FunctionComponent<{}> = () => (
  <a
    href="https://en-marche.fr/parametres/mon-compte/modifier"
    target="_blank"
    rel="noopener noreferrer"
  >
    {'en-marche.fr'}
  </a>
);

export const Profile: FunctionComponent = () => {
  const intl = useIntl();
  const { validateForm } = useValidateForm();
  const currentUser = useSelector(getCurrentUser);

  const onSubmit = () => {
    // TODO
  };

  if (currentUser === undefined) {
    return null;
  }

  const { email, firstName, lastName, isAdherent } = currentUser;
  const initialValues = {
    email,
    firstName,
    lastName,
    gender: GENDERS[0].value,
  } as ProfileFormValues;

  return (
    <Container>
      {isAdherent ? (
        <AdherentText>
          {intl.formatMessage(
            { id: 'profile.update_for_adherent' },
            { link: <UpdateEmProfileLink /> },
          )}
        </AdherentText>
      ) : null}
      <Formik<ProfileFormValues>
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={onSubmit}
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
          <Form onSubmit={handleSubmit} isAdherent={isAdherent}>
            <InputFieldWrapper>
              <InputField
                required
                disabled
                placeholder={intl.formatMessage({ id: 'profile.email-address' })}
                type="email"
                name="email"
                value={values.email}
              />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <InputField
                required
                placeholder={intl.formatMessage({ id: 'profile.first-name' })}
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
                placeholder={intl.formatMessage({ id: 'profile.last-name' })}
                type="text"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                error={touched.lastName === true && errors.lastName !== undefined}
                helperText={touched.lastName === true ? errors.lastName : undefined}
              />
            </InputFieldWrapper>
            <InputFieldWrapper isPlaceholder={values.gender === GENDERS[0].value}>
              <InputField
                select
                type="text"
                name="gender"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.gender}
                error={touched.gender === true && errors.gender !== undefined}
                helperText={touched.gender === true ? errors.gender : undefined}
              >
                {GENDERS.map(gender => (
                  <GenderItem
                    key={gender.value}
                    value={gender.value}
                    style={gender.isPlaceholder === true ? { display: 'none' } : {}}
                  >
                    {intl.formatMessage({ id: gender.labelKey })}
                  </GenderItem>
                ))}
              </InputField>
            </InputFieldWrapper>
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
            <InputFieldWrapper isPlaceholder={values.birthday === undefined}>
              <InputField
                type="date"
                name="birthday"
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue="1993-01-04"
                value={values.birthday}
                error={touched.birthday === true && errors.birthday !== undefined}
                helperText={touched.birthday === true ? errors.birthday : undefined}
              />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <InputField
                placeholder={intl.formatMessage({ id: 'profile.phone-number' })}
                type="tel"
                name="phoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                error={touched.phoneNumber === true && errors.phoneNumber !== undefined}
                helperText={touched.phoneNumber === true ? errors.phoneNumber : undefined}
              />
            </InputFieldWrapper>
            <ValidateButtonContainer isInPage>
              <FullWidthButton
                disabled={
                  isSubmitting || Object.keys(errors).length > 0 || isMatch(initialValues, values)
                }
                type="submit"
                size="small"
                variant="contained"
                color="primary"
              >
                {intl.formatMessage({ id: 'profile.save' })}
              </FullWidthButton>
            </ValidateButtonContainer>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Profile;
