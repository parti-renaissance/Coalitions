import InputField from 'components/InputField';
import { InputFieldWrapper } from 'components/InputField/InputField.style';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { QuickActionsTitle, QuickActionsDescription, ValidateButton } from './QuickActions.style';

export const QuickActions: FunctionComponent = () => {
  const { formatMessage } = useIntl();
  return (
    <>
      <QuickActionsTitle>
        <FormattedMessage id="quick_actions.title" />
      </QuickActionsTitle>
      <QuickActionsDescription>
        <FormattedMessage id="quick_actions.description" />
      </QuickActionsDescription>
      <form>
        <h3>
          <FormattedMessage id="quick_actions.action-title" values={{ number: 1 }} />
        </h3>
        <InputFieldWrapper>
          <InputField
            required
            placeholder={formatMessage({ id: 'quick_actions.label' })}
            type="text"
            name="label_1"
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <InputField
            required
            placeholder={formatMessage({ id: 'quick_actions.link' })}
            type="text"
            name="link_1"
          />
        </InputFieldWrapper>
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
    </>
  );
};
