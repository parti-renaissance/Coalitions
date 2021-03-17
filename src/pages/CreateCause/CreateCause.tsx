import React, { FunctionComponent, useState } from 'react';
import {
  Container,
  SubContainer,
  TopImage,
  StyledInputDescription,
  ValidateButton,
} from './CreateCause.style';
import InputSection from './components/InputSection';
import { useIntl } from 'react-intl';
import InputField from 'components/InputField';
import { Formik } from 'formik';
import { useValidateForm, FormValues } from './lib/useValidateForm';
import CoalitionCards from './components/CoalitionCards';
import ImageCropper from './components/ImageCropper';
import useSelector from 'redux/useSelector';
import { getUserToken } from 'redux/Login';
import LoginAndPreviewModal from './components/LoginAndPreviewModal';

const CreateCause: FunctionComponent = () => {
  const intl = useIntl();
  const { validateForm } = useValidateForm();
  const [isLoginModalOpened, setIsLoginModalOpened] = useState<boolean>(false);
  const isUserLoggedIn = Boolean(useSelector(getUserToken));

  const onValidateClick = () => {
    if (isUserLoggedIn) {
      // TODO
    } else {
      setIsLoginModalOpened(true);
    }
  };

  const closeLoginModal = () => {
    setIsLoginModalOpened(false);
  };

  return (
    <>
      <Container>
        <SubContainer>
          <TopImage src="/images/createCause.jpg" />
          <Formik
            initialValues={{} as FormValues}
            validate={validateForm}
            onSubmit={onValidateClick}
          >
            {({
              values,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              touched,
              setFieldValue,
              isSubmitting,
              setFieldTouched,
            }) => (
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
                    error={
                      touched.shortDescription === true && errors.shortDescription !== undefined
                    }
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
                  title={intl.formatMessage({ id: 'create_cause.image.title' })}
                  tips={intl.formatMessage({ id: 'create_cause.image.tips' })}
                >
                  <ImageCropper
                    image={values.image}
                    setImage={image => {
                      setFieldTouched('image');
                      setFieldValue('image', image);
                    }}
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
                            setFieldTouched('coalitionUuids');
                            setFieldValue('coalitionUuids', [coalitionUuid]);
                          }
                        }}
                      />
                    )) as FunctionComponent<{}>
                  }
                />
                <ValidateButton
                  disabled={
                    isSubmitting ||
                    Object.keys(errors).length > 0 ||
                    touched.title !== true ||
                    touched.coalitionUuids !== true ||
                    touched.image !== true
                  }
                  type="submit"
                  size="small"
                  variant="contained"
                  color="primary"
                >
                  {intl.formatMessage({ id: 'create_cause.validate' })}
                </ValidateButton>
              </form>
            )}
          </Formik>
        </SubContainer>
      </Container>
      <LoginAndPreviewModal isOpened={isLoginModalOpened} onClose={closeLoginModal} />
    </>
  );
};

export default CreateCause;
