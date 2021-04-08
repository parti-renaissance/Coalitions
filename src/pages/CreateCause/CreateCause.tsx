import React, { FunctionComponent, useState } from 'react';
import {
  Container,
  SubContainer,
  TopImage,
  ValidateButton,
  LoaderContainer,
} from './CreateCause.style';
import InputSection from './components/InputSection';
import { useIntl } from 'react-intl';
import InputField from 'components/InputField';
import Formik from 'components/Formik';
import { useValidateForm, FormValues } from './lib/useValidateForm';
import CoalitionCards from './components/CoalitionCards';
import ImageCropper from './components/ImageCropper';
import useSelector from 'redux/useSelector';
import { isUserLogged } from 'redux/Login';
import LoginAndPreviewModal from './components/LoginAndPreviewModal';
import { Coalition } from 'redux/Coalition/types';
import { useDispatch } from 'react-redux';
import { updateInCreationCause } from 'redux/Cause/slice';
import { convertFormValuesToCause } from './lib/convertFormValuesToCause';
import { useHistory } from 'react-router';
import { PATHS } from 'routes';
import { useInitialFormValues } from './lib/useInitialFormValues';
import Loader from 'components/Loader';

const CreateCause: FunctionComponent = () => {
  const intl = useIntl();
  const { validateForm } = useValidateForm();
  const [isLoginModalOpened, setIsLoginModalOpened] = useState<boolean>(false);
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const dispatch = useDispatch();
  const history = useHistory();
  const { initialFormValues, loadingInitialFormValues } = useInitialFormValues();

  const onSubmit = (values: FormValues) => {
    dispatch(updateInCreationCause(convertFormValuesToCause(values)));
    if (isUserLoggedIn) {
      history.push(PATHS.CAUSE_PREVIEW.url());
    } else {
      setIsLoginModalOpened(true);
    }
  };

  const closeLoginModal = () => {
    setIsLoginModalOpened(false);
  };

  if (loadingInitialFormValues && initialFormValues === undefined) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  return (
    <>
      <Container>
        <SubContainer>
          <TopImage src="/images/createCause.svg" />
          <Formik<FormValues>
            initialValues={initialFormValues}
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
              <form onSubmit={handleSubmit}>
                {initialFormValues.uuid !== undefined ? (
                  <input type="text" hidden value={initialFormValues.uuid} />
                ) : null}
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
                    inputProps={{ maxLength: 100 }}
                  />
                </InputSection>
                <InputSection
                  title={intl.formatMessage({ id: 'create_cause.description.title' })}
                  tips={intl.formatMessage({ id: 'create_cause.description.tips' })}
                >
                  <InputField
                    placeholder={intl.formatMessage({
                      id: 'create_cause.description.description-placeholder',
                    })}
                    type="text"
                    name="description"
                    multiline
                    rows={10}
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
                    (() => {
                      const selectedCoalitionUuids =
                        values.coalitions !== undefined
                          ? values.coalitions.map(({ uuid }) => uuid)
                          : [];
                      return (
                        <CoalitionCards
                          selectedCoalitionUuids={selectedCoalitionUuids}
                          onCoalitionClick={(coalition: Coalition) => {
                            if (values.coalitions !== undefined) {
                              if (selectedCoalitionUuids.includes(coalition.uuid)) {
                                const indexToRemove = selectedCoalitionUuids.indexOf(
                                  coalition.uuid,
                                );
                                const newValues = [...values.coalitions];
                                newValues.splice(indexToRemove, 1);
                                setFieldValue('coalitions', newValues);
                              } else if (values.coalitions.length < 2) {
                                setFieldValue('coalitions', [...values.coalitions, coalition]);
                              }
                            } else {
                              setFieldTouched('coalitions');
                              setFieldValue('coalitions', [coalition]);
                            }
                          }}
                        />
                      );
                    }) as FunctionComponent<{}>
                  }
                />
                <ValidateButton
                  disabled={
                    Object.keys(errors).length > 0 ||
                    (initialFormValues.title === undefined && touched.title !== true)
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
