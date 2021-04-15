import InputField from 'components/InputField';
import { InputFieldWrapper } from 'components/InputField/InputField.style';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  QuickActionsTitle,
  QuickActionsDescription,
  ValidateButton,
  AddIcon,
  AddButton,
  QuickActionContainer,
} from './QuickActions.style';
import Formik from 'components/Formik';
import { FieldArray } from 'formik';

type QuickActionsForms = {
  quickActions: {
    id?: number;
    label: string;
    link: string;
  }[];
};

export const QuickActions: FunctionComponent = () => {
  const { formatMessage } = useIntl();

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
      <Formik<QuickActionsForms> initialValues={initialValues} onSubmit={onSubmit}>
        {// eslint-disable-next-line complexity
        ({ values }) => (
          <form>
            <FieldArray
              name="quickActions"
              render={arrayHelpers => (
                <>
                  {values.quickActions.map((quickAction, index) => (
                    <QuickActionContainer
                      key={quickAction.id !== undefined ? quickAction.id : index}
                    >
                      <h3>
                        <FormattedMessage
                          id="quick_actions.action-title"
                          values={{ number: index + 1 }}
                        />
                      </h3>
                      <InputFieldWrapper>
                        <InputField
                          required
                          placeholder={formatMessage({ id: 'quick_actions.label' })}
                          type="text"
                          name={`label.${index}`}
                        />
                      </InputFieldWrapper>
                      <InputFieldWrapper>
                        <InputField
                          required
                          placeholder={formatMessage({ id: 'quick_actions.link' })}
                          type="text"
                          name={`link.${index}`}
                        />
                      </InputFieldWrapper>
                    </QuickActionContainer>
                  ))}
                  <AddButton
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => arrayHelpers.push({ label: '', link: '' })}
                  >
                    <AddIcon src="/images/add.svg" />
                    <FormattedMessage id="quick_actions.add" />
                  </AddButton>
                </>
              )}
            />
            <ValidateButton
              disabled={true}
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
