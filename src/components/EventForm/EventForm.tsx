/* eslint-disable max-lines */

import React, { FunctionComponent, useEffect } from 'react';
import {
  Container,
  Title,
  Description,
  Form,
  ModeButtonsContainer,
  ModeButton,
  DateFieldsWrapper,
  CategoryItem,
  BottomButtonsWrapper,
} from './EventForm.style';
import { useIntl } from 'react-intl';
import InputField from 'components/InputField';
import Formik from 'components/Formik';
import { EventFormValues, useValidateForm } from './lib/useValidateForm';
import { InCreationEventType, EventMode, EventType, UpdatedEventType } from 'redux/Events/types';
import { InputFieldWrapper } from 'components/InputField/InputField.style';
import { convertFormValuesToEvent } from './lib/convertFormValuesToEvent';
import { getIsValidateButtonDisabled } from './lib/getIsValidateButtonDisabled';
import { convertEventToFormValues } from './lib/convertEventToFormValues';
import { useFetchEventCategories } from 'redux/Events/hooks/useFetchEventCategories';
import Loader from 'components/Loader';
import { DeleteEventButton } from './components';
import { FullWidthButton } from 'components/Button/Button';

interface EventFormProps {
  causeId: string;
  initialEvent?: EventType;
  onSubmit: (event: InCreationEventType | UpdatedEventType) => void;
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

  const onSubmit = (values: EventFormValues) => {
    const event = convertFormValuesToEvent(values);
    return onSubmitProp(event);
  };

  let initialValues = { mode: 'meeting' as EventMode, causeId };
  if (initialEvent !== undefined) {
    initialValues = convertEventToFormValues(initialEvent);
  }

  if (eventCategories.length === 0 && loading) {
    return <Loader fullScreen />;
  }

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
      <Formik<EventFormValues>
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {// eslint-disable-next-line complexity
        ({ values, errors, handleChange, handleBlur, handleSubmit, touched, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <input type="text" hidden value={initialValues.causeId} name="causeId" />
            {initialEvent !== undefined ? (
              <input type="text" hidden value={initialEvent.uuid} name="uuid" />
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
                InputLabelProps={{ required: false }}
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
                  setFieldValue('link', '');
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
                  setFieldValue('address', '');
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
                error={
                  values.mode === 'meeting' &&
                  touched.address === true &&
                  errors.address !== undefined
                }
                helperText={
                  values.mode === 'meeting' && touched.address === true ? errors.address : undefined
                }
                InputLabelProps={{ required: false }}
              />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <InputField
                required={values.mode === 'online'}
                placeholder={intl.formatMessage({ id: 'event_form.link' })}
                type="text"
                name="link"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.link}
                error={
                  values.mode === 'online' && touched.link === true && errors.link !== undefined
                }
                helperText={
                  values.mode === 'online' && touched.link === true ? errors.link : undefined
                }
                InputLabelProps={{ required: false }}
              />
            </InputFieldWrapper>
            <DateFieldsWrapper>
              <InputFieldWrapper>
                <InputField
                  required
                  placeholder={intl.formatMessage({ id: 'event_form.begin_at' })}
                  type="datetime-local"
                  name="beginAtDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.beginAtDate}
                  error={touched.beginAtDate === true && errors.beginAtDate !== undefined}
                  helperText={touched.beginAtDate === true ? errors.beginAtDate : undefined}
                  InputLabelProps={{ shrink: true, required: false }}
                />
              </InputFieldWrapper>
              <InputFieldWrapper>
                <InputField
                  required
                  placeholder={intl.formatMessage({ id: 'event_form.finish_at' })}
                  type="datetime-local"
                  name="finishAtDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.finishAtDate}
                  error={touched.finishAtDate === true && errors.finishAtDate !== undefined}
                  helperText={touched.finishAtDate === true ? errors.finishAtDate : undefined}
                  InputLabelProps={{ shrink: true, required: false }}
                />
              </InputFieldWrapper>
            </DateFieldsWrapper>
            <InputFieldWrapper>
              <InputField
                select
                required
                placeholder={intl.formatMessage({ id: 'event_form.category' })}
                type="text"
                name="categoryId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.categoryId}
                error={touched.categoryId === true && errors.categoryId !== undefined}
                helperText={touched.categoryId === true ? errors.categoryId : undefined}
                InputLabelProps={{ required: false }}
              >
                {eventCategories.map(category => (
                  <CategoryItem key={category.uuid} value={category.uuid}>
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
                InputLabelProps={{ required: false }}
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
