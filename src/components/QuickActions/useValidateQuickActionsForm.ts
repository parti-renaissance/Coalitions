import { useIntl } from 'react-intl';
import { isFieldEmpty, isURLValid } from 'services/formik/form';

export type QuickAction = {
  id?: number;
  label: string;
  link: string;
};

export type QuickActionsForms = {
  quickActions: QuickAction[];
};

export type QuickActionError = {
  label: string;
  link: string;
};

export const useValidateQuickActionsForm = () => {
  const { formatMessage } = useIntl();

  const validateForm = ({ quickActions }: QuickActionsForms) => {
    const requiredErrorMessage = formatMessage({ id: 'form_errors.required' });
    let hasErrors = false;
    const errorsList = {
      quickActions: quickActions.map(quickAction => {
        const errors = {} as QuickActionError;
        if (isFieldEmpty(quickAction.label)) {
          errors.label = requiredErrorMessage;
          hasErrors = true;
        }
        if (isFieldEmpty(quickAction.link)) {
          errors.link = requiredErrorMessage;
          hasErrors = true;
        }
        if (isURLValid(quickAction.link)) {
          errors.link = formatMessage({ id: 'form_errors.not-valid-url' });
          hasErrors = true;
        }
        return errors;
      }),
    };
    return hasErrors ? errorsList : {};
  };

  return { validateForm };
};

export const hasFormErrors = (errors: QuickActionError[]) => {
  return errors.reduce(
    (isInError: boolean, quickActionErrors: QuickActionError) =>
      isInError || Object.keys(quickActionErrors).length > 0,
    false,
  );
};
