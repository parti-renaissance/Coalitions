/* eslint-disable max-lines */

import React, { FunctionComponent, useEffect } from 'react';
import {
  Container,
  Title,
  Description,
  Form,
  ModeButtonsContainer,
  ModeButton,
  InlineFieldsWrapper,
  CategoryItem,
  BottomButtonsWrapper,
} from './EventForm.style';
import { useIntl } from 'react-intl';
import InputField from 'components/InputField';
import Formik from 'components/Formik';
import { useValidateForm } from './lib/useValidateForm';
import { CreateEventType, EventType, UpdatedEventType } from 'redux/Events/types';
import { InputFieldWrapper } from 'components/InputField/InputField.style';
import { getIsValidateButtonDisabled } from './lib/getIsValidateButtonDisabled';
import { getInitialValues } from './lib/getInitialValues';
import { useFetchEventCategories } from 'redux/Events/hooks/useFetchEventCategories';
import Loader from 'components/Loader';
import { DeleteEventButton } from './components';
import { FullWidthButton } from 'components/Button/Button';
import { formatPickerDateToEventDate } from 'redux/Events/helpers/formatEventDateToPickerDate';
import CityAutocomplete from 'components/CityAutocomplete';
import { CityOrCountryType } from 'components/CityAutocomplete/hooks/useCityAndCountryAutocomplete';

interface EventFormProps {
  causeId: string;
  initialEvent?: EventType;
  onSubmit: (event: CreateEventType | UpdatedEventType) => void;
  isSubmitting: boolean;
}

const EventForm: FunctionComponent<EventFormProps> = ({
  initialEvent,
  onSubmit: onSubmitProp,
  isSubmitting,
  causeId,
}) => {
  const intl = useIntl();
  const { loading, eventCategories, fetchEventCategories } = useFetchEventCategories();
  const { validateForm } = useValidateForm();

  useEffect(() => {
    fetchEventCategories();
  }, [fetchEventCategories]);

  const onSubmit = (values: CreateEventType | UpdatedEventType) => {
    onSubmitProp({
      ...values,
      beginAt: formatPickerDateToEventDate({ date: values.beginAt, timeZone: values.timeZone }),
      finishAt: formatPickerDateToEventDate({ date: values.finishAt, timeZone: values.timeZone }),
    });
  };

  if (eventCategories.length === 0 && loading) {
    return <Loader fullScreen />;
  }

  const initialValues = getInitialValues({ initialEvent, causeId });

  return (
    <Container>
      <Title>
        {initialEvent !== undefined
          ? intl.formatMessage({ id: 'event_form.update.title' })
          : intl.formatMessage({ id: 'event_form.create.title' })}
      </Title>
      {initialEvent === undefined ? (
        <Description>{intl.formatMessage({ id: 'event_form.create.tips' })}</Description>
      ) : null}
      <Formik<CreateEventType | UpdatedEventType>
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {// eslint-disable-next-line complexity
        ({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <input type="text" hidden value={initialValues.causeId} name="causeId" />
            <input type="text" hidden value={initialValues.timeZone} name="timeZone" />
            {(initialValues as UpdatedEventType).uuid !== undefined ? (
              <input
                type="text"
                hidden
                value={(initialValues as UpdatedEventType).uuid}
                name="uuid"
              />
            ) : null}
            <InputFieldWrapper>
              <InputField
                required
                placeholder={intl.formatMessage({ id: 'event_form.title' })}
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={touched.name === true && errors.name !== undefined}
                helperText={touched.name === true ? errors.name : undefined}
              />
            </InputFieldWrapper>
            <input type="text" hidden value={values.mode} name="mode" required />
            <ModeButtonsContainer mode={values.mode}>
              <ModeButton
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => {
                  setFieldValue('mode', 'meeting');
                }}
              >
                {intl.formatMessage({ id: 'event_form.mode.meeting' })}
              </ModeButton>
              <ModeButton
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => {
                  setFieldValue('mode', 'online');
                }}
              >
                {intl.formatMessage({ id: 'event_form.mode.online' })}
              </ModeButton>
            </ModeButtonsContainer>
            <InputFieldWrapper>
              <InputField
                required
                placeholder={intl.formatMessage({ id: 'event_form.address' })}
                type="text"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                error={touched.address === true && errors.address !== undefined}
                helperText={touched.address === true ? errors.address : undefined}
              />
            </InputFieldWrapper>
            <InlineFieldsWrapper>
              <InputFieldWrapper>
                <InputField
                  required
                  placeholder={intl.formatMessage({ id: 'event_form.postal_code' })}
                  type="number"
                  name="postalCode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.postalCode}
                  error={touched.postalCode === true && errors.postalCode !== undefined}
                  helperText={touched.postalCode === true ? errors.postalCode : undefined}
                />
              </InputFieldWrapper>
              <InputFieldWrapper>
                <InputField
                  required
                  placeholder={intl.formatMessage({ id: 'event_form.city' })}
                  type="text"
                  name="cityName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cityName}
                  error={touched.cityName === true && errors.cityName !== undefined}
                  helperText={touched.cityName === true ? errors.cityName : undefined}
                />
              </InputFieldWrapper>
              <InputFieldWrapper>
                <CityAutocomplete
                  onChange={handleChange}
                  onBlur={handleBlur}
                  setIsTouched={() => setFieldTouched('countryCode', true)}
                  setValue={(value: string) => setFieldValue('countryCode', value)}
                  touched={touched.countryCode}
                  error={errors.countryCode}
                  placeholder={intl.formatMessage({ id: 'event_form.country' })}
                  type={CityOrCountryType.country}
                  initialCountryCode={initialValues.countryCode}
                  useCode
                />
              </InputFieldWrapper>
            </InlineFieldsWrapper>
            <InputFieldWrapper>
              <InputField
                required={values.mode === 'online'}
                placeholder={intl.formatMessage({ id: 'event_form.link' })}
                type="text"
                name="visioUrl"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.visioUrl}
                error={touched.visioUrl === true && errors.visioUrl !== undefined}
                helperText={touched.visioUrl === true ? errors.visioUrl : undefined}
              />
            </InputFieldWrapper>
            <InlineFieldsWrapper>
              <InputFieldWrapper>
                <InputField
                  required
                  placeholder={intl.formatMessage({ id: 'event_form.begin_at' })}
                  type="datetime-local"
                  name="beginAt"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.beginAt}
                  error={touched.beginAt === true && errors.beginAt !== undefined}
                  helperText={touched.beginAt === true ? errors.beginAt : undefined}
                  InputLabelProps={{ shrink: true }}
                />
              </InputFieldWrapper>
              <InputFieldWrapper>
                <InputField
                  required
                  placeholder={intl.formatMessage({ id: 'event_form.finish_at' })}
                  type="datetime-local"
                  name="finishAt"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.finishAt}
                  error={touched.finishAt === true && errors.finishAt !== undefined}
                  helperText={touched.finishAt === true ? errors.finishAt : undefined}
                  InputLabelProps={{ shrink: true }}
                />
              </InputFieldWrapper>
            </InlineFieldsWrapper>
            <InputFieldWrapper>
              <InputField
                select
                required
                placeholder={intl.formatMessage({ id: 'event_form.category' })}
                type="text"
                name="categorySlug"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.categorySlug}
                error={touched.categorySlug === true && errors.categorySlug !== undefined}
                helperText={touched.categorySlug === true ? errors.categorySlug : undefined}
              >
                {eventCategories.map(category => (
                  <CategoryItem key={category.slug} value={category.slug}>
                    {category.name}
                  </CategoryItem>
                ))}
              </InputField>
            </InputFieldWrapper>
            <InputFieldWrapper>
              <InputField
                required
                placeholder={intl.formatMessage({ id: 'event_form.description' })}
                type="text"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                error={touched.description === true && errors.description !== undefined}
                helperText={touched.description === true ? errors.description : undefined}
                multiline
                rows={10}
              />
            </InputFieldWrapper>
            <BottomButtonsWrapper>
              {initialEvent !== undefined ? <DeleteEventButton /> : null}
              <FullWidthButton
                isLoading={isSubmitting}
                disabled={
                  Boolean(isSubmitting) ||
                  getIsValidateButtonDisabled({
                    errors,
                    initialValues,
                    touched,
                    isUpdating: initialEvent !== undefined,
                    values,
                  })
                }
                type="submit"
                size="small"
                variant="contained"
                color="primary"
              >
                {initialEvent !== undefined
                  ? intl.formatMessage({ id: 'event_form.update.validate' })
                  : intl.formatMessage({ id: 'event_form.create.validate' })}
              </FullWidthButton>
            </BottomButtonsWrapper>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EventForm;

/* eslint-enable max-lines */
