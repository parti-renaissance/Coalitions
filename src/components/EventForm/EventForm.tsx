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
import { useValidateForm } from './lib/useValidateForm';
import { InCreationEventType, EventType } from 'redux/Events/types';
import { getInitialValues } from './lib/getInitialValues';
import { InputFieldWrapper } from 'components/InputField/InputField.style';

interface EventFormProps {
  initialEvent?: EventType;
  onSubmit: (event: InCreationEventType | EventType) => void;
  isSubmitting: boolean;
}

const EventForm: FunctionComponent<EventFormProps> = ({ initialEvent, onSubmit, isSubmitting }) => {
  const intl = useIntl();
  const { validateForm } = useValidateForm();

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
      <Formik<InCreationEventType>
        initialValues={getInitialValues(initialEvent)}
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
                onClick={() => setFieldValue('mode', 'meeting')}
              >
                {intl.formatMessage({ id: 'event_form.mode.meeting' })}
              </ModeButton>
              <ModeButton
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => setFieldValue('mode', 'online')}
              >
                {intl.formatMessage({ id: 'event_form.mode.online' })}
              </ModeButton>
            </ModeButtonsContainer>
            <InputFieldWrapper>
              <InputField
                required
                disabled={values.mode === 'online'}
                placeholder={intl.formatMessage({ id: 'event_form.address' })}
                type="text"
                name="post_address.address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.post_address?.address}
                error={Boolean(touched.post_address) && errors.post_address !== undefined}
                helperText={Boolean(touched.post_address) ? errors.post_address : undefined}
              />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <InputField
                placeholder={intl.formatMessage({ id: 'event_form.link' })}
                type="text"
                name="visio_url"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.visio_url}
                error={Boolean(touched.visio_url) && errors.visio_url !== undefined}
                helperText={Boolean(touched.visio_url) ? errors.visio_url : undefined}
              />
            </InputFieldWrapper>
            <DateFieldsWrapper>
              <InputFieldWrapper>
                <InputField
                  required
                  placeholder={intl.formatMessage({ id: 'event_form.begin_at' })}
                  type="datetime-local"
                  name="begin_at"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.begin_at}
                  error={Boolean(touched.begin_at) && errors.begin_at !== undefined}
                  helperText={Boolean(touched.begin_at) ? errors.visio_url : undefined}
                  InputLabelProps={{ shrink: true }}
                />
              </InputFieldWrapper>
              <InputFieldWrapper>
                <InputField
                  required
                  placeholder={intl.formatMessage({ id: 'event_form.finish_at' })}
                  type="datetime-local"
                  name="finish_at"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.finish_at}
                  error={Boolean(touched.finish_at) && errors.finish_at !== undefined}
                  helperText={Boolean(touched.finish_at) ? errors.finish_at : undefined}
                  InputLabelProps={{ shrink: true }}
                />
              </InputFieldWrapper>
            </DateFieldsWrapper>
            <InputFieldWrapper>
              <InputField
                disabled={values.mode === 'online'}
                placeholder={intl.formatMessage({ id: 'event_form.category' })}
                type="text"
                name="category.event_group_category.name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.category?.event_group_category?.name}
                error={Boolean(touched.category) && errors.category !== undefined}
                helperText={Boolean(touched.category) ? errors.category : undefined}
              />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <InputField
                placeholder={intl.formatMessage({ id: 'event_form.description' })}
                type="text"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                error={Boolean(touched.description) && errors.description !== undefined}
                helperText={Boolean(touched.description) ? errors.description : undefined}
                multiline
                rows={10}
              />
            </InputFieldWrapper>
            <ValidateButton
              isLoading={isSubmitting}
              disabled
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
