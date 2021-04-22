import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { format } from 'date-fns';
import { Container, GenderItem, AdherentText, Form } from './Profile.style';
import InputField from 'components/InputField';
import Formik from 'components/Formik';
import { FullWidthButton } from 'components/Button/Button';
import { InputFieldWrapper } from 'components/InputField/InputField.style';
import { ValidateButtonContainer } from 'components/LoginModal/components/CreateAccountForm/CreateAccountForm.style';
import { useValidateForm, ProfileFormValues, GENDERS } from './hooks/useValidateForm';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'redux/User/selectors';
import { useUpdateUserProfile } from './hooks/useUpdateUserProfile';

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
  const { loading, updateUserProfile } = useUpdateUserProfile(currentUser?.uuid);

  const onSubmit = (values: ProfileFormValues) => {
    updateUserProfile(values);
  };

  if (currentUser === undefined) {
    return null;
  }

  const { email, firstName, lastName, gender, birthdate, phone, isAdherent } = currentUser;

  const initialValues = {
    email,
    firstName,
    lastName,
    gender: gender === null ? GENDERS[0].value : gender,
    birthday:
      birthdate === undefined || birthdate === null
        ? null
        : format(new Date(birthdate), 'yyyy-MM-dd'),
    phoneNumber: phone,
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
        ({ values, errors, handleChange, handleBlur, handleSubmit, touched, dirty }) => (
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
                placeholder={intl.formatMessage({ id: 'profile.gender.placeholder' })}
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
            {/* <InputFieldWrapper>
              <CityAutocomplete
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                touched={touched}
                errors={errors}
              />
            </InputFieldWrapper> */}
            <InputFieldWrapper isPlaceholder={values.birthday === null}>
              <InputField
                type="date"
                name="birthday"
                placeholder={intl.formatMessage({ id: 'profile.birthday' })}
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue="1993-01-04"
                value={values.birthday}
                error={touched.birthday === true && errors.birthday !== undefined}
                helperText={touched.birthday === true ? errors.birthday : undefined}
              />
            </InputFieldWrapper>
            {/* <InputFieldWrapper>
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
            </InputFieldWrapper> */}
            <ValidateButtonContainer isInPage>
              <FullWidthButton
                disabled={!dirty || Object.keys(errors).length > 0}
                type="submit"
                size="small"
                variant="contained"
                color="primary"
                isLoading={loading}
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
