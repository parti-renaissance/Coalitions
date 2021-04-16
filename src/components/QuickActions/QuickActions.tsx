import InputField from 'components/InputField';
import { InputFieldWrapper } from 'components/InputField/InputField.style';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  QuickActionsTitle,
  QuickActionsDescription,
  ValidateButton,
  QuickActionContainer,
  QuickActionDeleteButton,
  QuickActionHeadLineContainer,
} from './QuickActions.style';
import Formik from 'components/Formik';
import { FieldArray, getIn } from 'formik';
import {
  hasFormErrors,
  QuickActionError,
  QuickActionsForms,
  useValidateQuickActionsForm,
} from './useValidateQuickActionsForm';
import { AddButton } from './components/AddButton/AddButton';

export const QuickActions: FunctionComponent = () => {
  const { formatMessage } = useIntl();
  const { validateForm } = useValidateQuickActionsForm();

  const initialValues = { quickActions: [{ label: '', link: '' }] };
  const onSubmit = (values: QuickActionsForms) => console.log('values', values);
  return (
    <>
      <QuickActionsTitle>
        <FormattedMessage id="quick_actions.title" />
      </QuickActionsTitle>
      <QuickActionsDescription>
        <FormattedMessage id="quick_actions.description" />
      </QuickActionsDescription>
      <Formik<QuickActionsForms>
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validateForm}
        validateOnMount={true}
      >
        {// eslint-disable-next-line complexity
        ({ values, handleChange, handleBlur, touched, errors }) => (
          <form>
            <FieldArray
              name="quickActions"
              render={arrayHelpers => (
                <>
                  {values.quickActions.map((quickAction, index) => {
                    const labelFieldName = `quickActions[${index}].label`;
                    const labelFieldTouched = getIn(touched, labelFieldName);
                    const labelFieldError = getIn(errors, labelFieldName);

                    const linkFieldName = `quickActions[${index}].link`;
                    const linkFieldTouched = getIn(touched, linkFieldName);
                    const linkFieldError = getIn(errors, linkFieldName);
                    return (
                      <QuickActionContainer
                        key={quickAction.id !== undefined ? quickAction.id : index}
                      >
                        <QuickActionHeadLineContainer>
                          <h3>
                            <FormattedMessage
                              id="quick_actions.action-title"
                              values={{ number: index + 1 }}
                            />
                          </h3>
                          <QuickActionDeleteButton onClick={() => arrayHelpers.remove(index)}>
                            <FormattedMessage id="quick_actions.action-delete" />
                          </QuickActionDeleteButton>
                        </QuickActionHeadLineContainer>
                        <InputFieldWrapper>
                          <InputField
                            required
                            placeholder={formatMessage({ id: 'quick_actions.label' })}
                            type="text"
                            name={labelFieldName}
                            error={labelFieldTouched === true && labelFieldError !== undefined}
                            helperText={labelFieldTouched === true ? labelFieldError : null}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={quickAction.label}
                          />
                        </InputFieldWrapper>
                        <InputFieldWrapper>
                          <InputField
                            required
                            placeholder={formatMessage({ id: 'quick_actions.link' })}
                            type="text"
                            name={linkFieldName}
                            error={linkFieldTouched === true && linkFieldError !== undefined}
                            helperText={linkFieldTouched === true ? linkFieldError : null}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={quickAction.link}
                          />
                        </InputFieldWrapper>
                      </QuickActionContainer>
                    );
                  })}
                  <AddButton
                    disabled={
                      errors.quickActions === undefined
                        ? true
                        : hasFormErrors(errors.quickActions as QuickActionError[])
                    }
                    push={arrayHelpers.push}
                  />
                </>
              )}
            />
            <ValidateButton
              disabled={
                errors.quickActions === undefined
                  ? true
                  : hasFormErrors(errors.quickActions as QuickActionError[])
              }
              type="submit"
              size="small"
              variant="contained"
              color="primary"
            >
              <FormattedMessage id="quick_actions.validate" />
            </ValidateButton>
          </form>
        )}
      </Formik>
    </>
  );
};
