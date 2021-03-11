import { RootState } from 'redux/types';
import { SnackbarConfig } from './types';

export const getSnackbarConfig = (store: RootState): SnackbarConfig | undefined => {
  return store.snackbar.snackbarConfig;
};
