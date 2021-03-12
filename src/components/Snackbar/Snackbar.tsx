import React, { FunctionComponent } from 'react';
import MUISnackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import { useSnackbar } from 'redux/Snackbar/hooks';
import { StyledAlert } from './Snackbar.style';

const Snackbar: FunctionComponent<SnackbarProps> = props => {
  const { snackbarConfig, hideSnackbar } = useSnackbar();

  if (snackbarConfig === undefined) {
    return null;
  }

  return (
    <MUISnackbar {...props} open autoHideDuration={6000} onClose={hideSnackbar}>
      <StyledAlert severity={snackbarConfig.severity}>{snackbarConfig.message}</StyledAlert>
    </MUISnackbar>
  );
};

export default Snackbar;
