import React from 'react';
import { useIntl } from 'react-intl';
import { Container } from './Profile.style';
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
import MenuItem from '@material-ui/core/MenuItem';

export const Profile: React.FunctionComponent = () => {
  const intl = useIntl();
  const { validateForm } = useValidateForm();
  const currentUser = useSelector(getCurrentUser);

  const onSubmit = () => {
    // TODO
  };

  if (currentUser === undefined) {
    return null;
  }

  const { email, firstName, lastName } = currentUser;
  const initialValues = {
    email,
    firstName,
    lastName,
    gender: GENDERS[0].value,
  } as ProfileFormValues;
  return (
    <Container>
      <Formik<ProfileFormValues>
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={onSubmit}
      >
        {({
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
            <InputFieldWrapper>
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
                {GENDERS.map((gender, index) => (
                  <MenuItem
                    key={gender.value}
                    value={gender.value}
                    style={gender.isPlaceholder === true ? { display: 'none' } : {}}
                  >
                    {intl.formatMessage({ id: gender.labelKey })}
                  </MenuItem>
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
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default Profile;
