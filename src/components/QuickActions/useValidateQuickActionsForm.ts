import { useIntl } from 'react-intl';
import { QuickAction } from 'redux/Cause/types';
import { isFieldEmpty, isURLValid } from 'services/formik/form';

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

    let errorsList = {};

    let hasQuickActionsErros = false;
    const quickActionsErrors = quickActions.map(quickAction => {
      const errors = {} as QuickActionError;
      if (isFieldEmpty(quickAction.label)) {
        errors.label = requiredErrorMessage;
        hasQuickActionsErros = true;
      }
      if (quickAction.label.length <= 2) {
        errors.label = formatMessage({ id: 'form_errors.too-short-value' });
        hasQuickActionsErros = true;
      }
      if (isFieldEmpty(quickAction.link)) {
        errors.link = requiredErrorMessage;
        hasQuickActionsErros = true;
      }
      if (isURLValid(quickAction.link)) {
        errors.link = formatMessage({ id: 'form_errors.not-valid-url' });
        hasQuickActionsErros = true;
      }
      return errors;
    });

    if (hasQuickActionsErros) {
      errorsList = {
        ...errorsList,
        quickActions: quickActionsErrors,
      };
    }

    return errorsList;
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
