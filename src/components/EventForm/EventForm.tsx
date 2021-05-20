/* eslint-disable max-lines */

import React, { FunctionComponent } from 'react';
import {
  Container,
  Title,
  Description,
  Form,
  ValidateButton,
  ModeButtonsContainer,
  ModeButton,
  DateFieldsWrapper,
} from './EventForm.style';
import { useIntl } from 'react-intl';
import InputField from 'components/InputField';
import Formik from 'components/Formik';
import { EventFormValues, useValidateForm } from './lib/useValidateForm';
import { InCreationEventType, EventType, EventMode } from 'redux/Events/types';
import { InputFieldWrapper } from 'components/InputField/InputField.style';
import { convertFormValuesToEvent } from './lib/convertFormValuesToEvent';
import { getIsValidateButtonDisabled } from './lib/getIsValidateButtonDisabled';
import { convertEventToFormValues } from './lib/convertEventToFormValues';

interface EventFormProps {
  initialEvent?: EventType;
  onSubmit: (event: InCreationEventType | EventType) => void;
  isSubmitting: boolean;
}

const EventForm: FunctionComponent<EventFormProps> = ({
  initialEvent,
  onSubmit: onSubmitProp,
  isSubmitting,
}) => {
  const intl = useIntl();
  const { validateForm } = useValidateForm();

  const onSubmit = (values: EventFormValues) => {
    const event = convertFormValuesToEvent(values);
    return onSubmitProp(event);
  };

  let initialValues = { mode: 'meeting' as EventMode };
  if (initialEvent !== undefined) {
    initialValues = convertEventToFormValues(initialEvent);
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
              />
            </InputFieldWrapper>
            <input type="text" hidden value={values.mode} name="mode" />
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
                required={values.mode === 'meeting'}
                disabled={values.mode === 'online'}
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
              />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <InputField
                required={values.mode === 'online'}
                disabled={values.mode === 'meeting'}
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
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
                />
              </InputFieldWrapper>
            </DateFieldsWrapper>
            <InputFieldWrapper>
              <InputField
                required
                disabled={values.mode === 'online'}
                placeholder={intl.formatMessage({ id: 'event_form.category' })}
                type="text"
                name="categoryId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.categoryId}
                error={touched.categoryId === true && errors.categoryId !== undefined}
                helperText={touched.categoryId === true ? errors.categoryId : undefined}
              />
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
            <ValidateButton
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
            </ValidateButton>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EventForm;

/* eslint-enable max-lines */
