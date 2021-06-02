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

    let hasQuickActionsErrors = false;
    const quickActionsErrors = quickActions.map(quickAction => {
      const errors = {} as QuickActionError;
      if (isFieldEmpty(quickAction.label)) {
        errors.label = requiredErrorMessage;
        hasQuickActionsErrors = true;
      }
      if (quickAction.label.length <= 2) {
        errors.label = formatMessage({ id: 'form_errors.too-short' }, { minLength: 3 });
        hasQuickActionsErrors = true;
      }
      if (isFieldEmpty(quickAction.link)) {
        errors.link = requiredErrorMessage;
        hasQuickActionsErrors = true;
      }
      if (isURLValid(quickAction.link)) {
        errors.link = formatMessage({ id: 'form_errors.not-valid-url' });
        hasQuickActionsErrors = true;
      }
      return errors;
    });

    if (hasQuickActionsErrors) {
      errorsList = {
        ...errorsList,
        quickActions: quickActionsErrors,
      };
    }

    return errorsList;
  };

  return { validateForm };
};
