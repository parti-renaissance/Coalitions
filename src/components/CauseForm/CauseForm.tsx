/* eslint-disable max-lines */

import React, { FunctionComponent, useState } from 'react';
import { Container, SubContainer, TopImage, ValidateButton } from './CauseForm.style';
import InputSection from './components/InputSection';
import { useIntl } from 'react-intl';
import InputField from 'components/InputField';
import Formik from 'components/Formik';
import { useValidateForm, FormValues } from './lib/useValidateForm';
import CoalitionCards from './components/CoalitionCards';
import ImageCropper from './components/ImageCropper';
import LoginAndPreviewModal from './components/LoginAndPreviewModal';
import useSelector from 'redux/useSelector';
import { isUserLogged } from 'redux/Login';
import { Cause, InCreationCause } from 'redux/Cause/types';
import { convertCauseToFormValues } from './lib/convertCauseToFormValues';
import { convertFormValuesToCause } from './lib/convertFormValuesToCause';
import { getOnCoalitionClick } from './lib/getOnCoalitionClick';
import { getIsValidateButtonDisabled } from './lib/getIsValidateButtonDisabled';

interface CauseFormProps {
  initialCause?: InCreationCause | Cause;
  onSubmitBegin?: (cause: InCreationCause | Cause) => void;
  onSubmit: (cause: InCreationCause | Cause) => void;
  isSubmitting?: boolean;
}

const CauseForm: FunctionComponent<CauseFormProps> = ({
  initialCause,
  onSubmitBegin,
  onSubmit: onSubmitFromProps,
  isSubmitting,
}) => {
  const intl = useIntl();
  const { validateForm } = useValidateForm();
  const [isLoginModalOpened, setIsLoginModalOpened] = useState<boolean>(false);
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));

  const onSubmit = (values: FormValues) => {
    const cause = convertFormValuesToCause(values);

    if (onSubmitBegin !== undefined) {
      onSubmitBegin(cause);
    }

    if (isUserLoggedIn) {
      onSubmitFromProps(cause);
    } else {
      setIsLoginModalOpened(true);
    }
  };

  const closeLoginModal = () => {
    setIsLoginModalOpened(false);
  };

  const renderEmail = () => <a href="mailto:contact@pourunecause.fr">contact@pourunecause.fr</a>;

  const initialValues = convertCauseToFormValues(initialCause);
  const isAPublishedCause = initialValues.uuid !== undefined;
  return (
    <>
      <Container>
        <SubContainer>
          <TopImage src="/images/createCause.svg" />
          <Formik<FormValues>
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
              <form onSubmit={handleSubmit}>
                {isAPublishedCause ? <input type="text" hidden value={initialValues.uuid} /> : null}
                <InputSection
                  hideTips={isAPublishedCause}
                  title={intl.formatMessage({ id: 'create_cause.title.title' })}
                  tips={
                    isAPublishedCause
                      ? (intl.formatMessage(
                          { id: 'update_cause.title.tips' },
                          { email: renderEmail() },
                        ) as string)
                      : intl.formatMessage({ id: 'create_cause.title.tips' })
                  }
                >
                  <InputField
                    required
                    placeholder={intl.formatMessage({ id: 'create_cause.title.placeholder' })}
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    error={touched.title === true && errors.title !== undefined}
                    helperText={touched.title === true ? errors.title : undefined}
                    inputProps={{ maxLength: 100 }}
                    disabled={isAPublishedCause}
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
                  hideTips={isAPublishedCause}
                  title={intl.formatMessage({ id: 'create_cause.coalitions.title' })}
                  tips={
                    isAPublishedCause
                      ? (intl.formatMessage(
                          { id: 'update_cause.coalitions.tips' },
                          { email: renderEmail() },
                        ) as string)
                      : intl.formatMessage({ id: 'create_cause.coalitions.tips' })
                  }
                  BottomChildren={
                    (() => (
                      <CoalitionCards
                        selectedCoalitionUuids={
                          values.coalitions !== undefined
                            ? values.coalitions.map(({ uuid }) => uuid)
                            : []
                        }
                        onCoalitionClick={
                          isAPublishedCause
                            ? undefined
                            : getOnCoalitionClick({ values, setFieldValue, setFieldTouched })
                        }
                      />
                    )) as FunctionComponent<{}>
                  }
                />
                <ValidateButton
                  isLoading={isSubmitting}
                  disabled={
                    Boolean(isSubmitting) ||
                    getIsValidateButtonDisabled({
                      errors,
                      initialValues,
                      touched,
                      isAPublishedCause,
                      values,
                    })
                  }
                  type="submit"
                  size="small"
                  variant="contained"
                  color="primary"
                >
                  {isAPublishedCause
                    ? intl.formatMessage({ id: 'update_cause.validate' })
                    : intl.formatMessage({ id: 'create_cause.validate' })}
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

export default CauseForm;

/* eslint-enable max-lines */
