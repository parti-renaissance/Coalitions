import React, { FunctionComponent } from 'react';
import { Container, Title, Description, Form, ValidateButton } from './EventForm.style';
import { useIntl } from 'react-intl';
import InputField from 'components/InputField';
import Formik from 'components/Formik';
import { useValidateForm } from './lib/useValidateForm';
import { InCreationEventType, EventType } from 'redux/Events/types';
import { getInitialValues } from './lib/getInitialValues';

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
        {({ values, errors, handleChange, handleBlur, handleSubmit, touched }) => (
          <Form onSubmit={handleSubmit}>
            {initialEvent !== undefined ? (
              <input type="text" hidden value={initialEvent.uuid} />
            ) : null}
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
