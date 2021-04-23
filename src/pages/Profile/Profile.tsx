/* eslint-disable max-lines */
import React, { FunctionComponent, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { format } from 'date-fns';
import { Container, GenderItem, AdherentText, Form, PhoneContainer } from './Profile.style';
import InputField from 'components/InputField';
import Formik from 'components/Formik';
import { FullWidthButton } from 'components/Button/Button';
import { InputFieldWrapper } from 'components/InputField/InputField.style';
import { ValidateButtonContainer } from 'components/LoginModal/components/CreateAccountForm/CreateAccountForm.style';
import { useValidateForm, ProfileFormValues, GENDERS } from './hooks/useValidateForm';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'redux/User/selectors';
import { useUpdateUserProfile } from './hooks/useUpdateUserProfile';
import { Autocomplete } from '@material-ui/lab';
import { useFetchPhoneCountries, PhoneCountry } from './hooks/useFetchPhoneCountries';

const UpdateEmProfileLink: FunctionComponent<{}> = () => (
  <a
    href="https://en-marche.fr/parametres/mon-compte/modifier"
    target="_blank"
    rel="noopener noreferrer"
  >
    {'en-marche.fr'}
  </a>
);

const formatPhoneCountryInput = (phoneCountry: PhoneCountry) =>
  `${phoneCountry.name} (+ ${phoneCountry.code})`;

const DEFAULT_COUNTRY_REGION = 'FR';

const findPhoneCountryByRegion = (phoneCountries: PhoneCountry[], region: string) => {
  return phoneCountries.find(phoneCountry => phoneCountry.region === region);
};

// eslint-disable-next-line complexity
export const Profile: FunctionComponent = () => {
  const intl = useIntl();
  const { validateForm } = useValidateForm();
  const currentUser = useSelector(getCurrentUser);
  const { loading, updateUserProfile } = useUpdateUserProfile(currentUser?.uuid);
  const { phoneCountries, fetchPhoneCountries } = useFetchPhoneCountries();

  useEffect(() => {
    fetchPhoneCountries();
  }, [fetchPhoneCountries]);

  const onSubmit = (values: ProfileFormValues) => {
    updateUserProfile(values);
  };

  if (currentUser === undefined || phoneCountries.length === 0) {
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
    phoneNumber: phone !== null && phone !== undefined ? phone.number : null,
    phoneCountry: findPhoneCountryByRegion(
      phoneCountries,
      phone !== null && phone !== undefined ? phone.country : DEFAULT_COUNTRY_REGION,
    ),
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
        ({ values, errors, handleChange, handleBlur, handleSubmit, touched, dirty, setValues }) => (
          <Form onSubmit={handleSubmit} isAdherent={isAdherent}>
            <InputFieldWrapper>
              <InputField
                required
                disabled
                placeholder={intl.formatMessage({ id: 'profile.email-address' })}
                type="email"
                name="email"
                value={values.email}
                inputProps={{ maxLength: 255 }}
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
                inputProps={{ maxLength: 50 }}
              />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <InputField
                placeholder={intl.formatMessage({ id: 'profile.last-name' })}
                type="text"
                name="lastName"
                hideOptionnal
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                error={touched.lastName === true && errors.lastName !== undefined}
                helperText={touched.lastName === true ? errors.lastName : undefined}
                inputProps={{ maxLength: 50 }}
              />
            </InputFieldWrapper>
            <InputFieldWrapper isPlaceholder={values.gender === GENDERS[0].value}>
              <InputField
                select
                type="text"
                name="gender"
                hideOptionnal
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
                hideOptionnal
                placeholder={intl.formatMessage({ id: 'profile.birthday' })}
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue="1993-01-04"
                value={values.birthday}
                error={touched.birthday === true && errors.birthday !== undefined}
                helperText={touched.birthday === true ? errors.birthday : undefined}
              />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <PhoneContainer>
                <Autocomplete
                  options={phoneCountries}
                  value={values.phoneCountry}
                  onChange={(_, newValue: PhoneCountry | null) => {
                    if (newValue !== null) setValues({ ...values, phoneCountry: newValue });
                  }}
                  getOptionLabel={formatPhoneCountryInput}
                  renderInput={params => (
                    <InputField
                      {...params}
                      hideOptionnal
                      placeholder={intl.formatMessage({ id: 'profile.country' })}
                      variant="outlined"
                    />
                  )}
                />
                <InputField
                  placeholder={intl.formatMessage({ id: 'profile.phone-number' })}
                  type="tel"
                  name="phoneNumber"
                  hideOptionnal
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  error={touched.phoneNumber === true && errors.phoneNumber !== undefined}
                  helperText={touched.phoneNumber === true ? errors.phoneNumber : undefined}
                />
              </PhoneContainer>
            </InputFieldWrapper>

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
/* eslint-enable max-lines */
