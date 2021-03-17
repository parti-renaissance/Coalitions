import React, { FunctionComponent } from 'react';
import { Container, SubContainer, TopImage, StyledInputDescription } from './CreateCause.style';
import InputSection from './components/InputSection';
import { useIntl } from 'react-intl';
import InputField from 'components/InputField';
import { Formik } from 'formik';
import { useValidateForm, FormValues } from './lib/useValidateForm';
import CoalitionCards from './components/CoalitionCards';

const CreateCause: FunctionComponent = () => {
  const intl = useIntl();
  const { validateForm } = useValidateForm();

  const onValidateClick = () => {
    // TODO
  };

  return (
    <Container>
      <SubContainer>
        <TopImage src="/images/createCause.jpg" />
        <Formik initialValues={{} as FormValues} validate={validateForm} onSubmit={onValidateClick}>
          {({ values, errors, handleChange, handleBlur, handleSubmit, touched, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <InputSection
                title={intl.formatMessage({ id: 'create_cause.title.title' })}
                tips={intl.formatMessage({ id: 'create_cause.title.tips' })}
              >
                <InputField
                  placeholder={intl.formatMessage({ id: 'create_cause.title.placeholder' })}
                  type="text"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  error={touched.title === true && errors.title !== undefined}
                  helperText={touched.title === true ? errors.title : undefined}
                  inputProps={{ maxLength: 80 }}
                />
              </InputSection>
              <InputSection
                title={intl.formatMessage({ id: 'create_cause.description.title' })}
                tips={intl.formatMessage({ id: 'create_cause.description.tips' })}
              >
                <InputField
                  placeholder={intl.formatMessage({
                    id: 'create_cause.description.short-description-placeholder',
                  })}
                  type="text"
                  name="shortDescription"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.shortDescription}
                  error={touched.shortDescription === true && errors.shortDescription !== undefined}
                  helperText={
                    touched.shortDescription === true ? errors.shortDescription : undefined
                  }
                  inputProps={{ maxLength: 500 }}
                />
                <StyledInputDescription
                  placeholder={intl.formatMessage({
                    id: 'create_cause.description.description-placeholder',
                  })}
                  type="text"
                  name="description"
                  multiline
                  rows={5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  error={touched.description === true && errors.description !== undefined}
                  helperText={touched.description === true ? errors.description : undefined}
                  inputProps={{ maxLength: 10000 }}
                />
              </InputSection>
              <InputSection
                title={intl.formatMessage({ id: 'create_cause.coalitions.title' })}
                tips={intl.formatMessage({ id: 'create_cause.coalitions.tips' })}
                BottomChildren={
                  (() => (
                    <CoalitionCards
                      selectedCoalitionUuids={values.coalitionUuids}
                      onCoalitionClick={(coalitionUuid: string) => {
                        if (values.coalitionUuids !== undefined) {
                          if (values.coalitionUuids.includes(coalitionUuid)) {
                            const indexToRemove = values.coalitionUuids.indexOf(coalitionUuid);
                            const newValues = [...values.coalitionUuids];
                            newValues.splice(indexToRemove, 1);
                            setFieldValue('coalitionUuids', newValues);
                          } else if (values.coalitionUuids.length < 2) {
                            setFieldValue('coalitionUuids', [
                              ...values.coalitionUuids,
                              coalitionUuid,
                            ]);
                          }
                        } else {
                          setFieldValue('coalitionUuids', [coalitionUuid]);
                        }
                      }}
                    />
                  )) as FunctionComponent<{}>
                }
              />
            </form>
          )}
        </Formik>
      </SubContainer>
    </Container>
  );
};

export default CreateCause;
