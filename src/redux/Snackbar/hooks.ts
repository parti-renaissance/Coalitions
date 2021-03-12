import { getSnackbarConfig } from './selectors';
import { useDispatch, useSelector } from 'react-redux';
import { updateSnackbar } from 'redux/Snackbar';
import { Severity } from './types';

export const useSnackbar = () => {
  const dispatch = useDispatch();
  const snackbarConfig = useSelector(getSnackbarConfig);

  const hideSnackbar = () => {
    dispatch(updateSnackbar(undefined));
  };

  const showSuccessSnackbar = (message: string) => {
    dispatch(updateSnackbar({ message, severity: Severity.success }));
  };

  const showErrorSnackbar = (message: string) => {
    dispatch(updateSnackbar({ message, severity: Severity.error }));
  };

  const showWarningSnackbar = (message: string) => {
    dispatch(updateSnackbar({ message, severity: Severity.warning }));
  };

  return {
    snackbarConfig,
    hideSnackbar,
    showSuccessSnackbar,
    showErrorSnackbar,
    showWarningSnackbar,
  };
};
