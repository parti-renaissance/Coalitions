import React, { FunctionComponent } from 'react';
import { SnackbarProps } from '@material-ui/core/Snackbar';
import { useSnackbar } from 'redux/Snackbar/hooks';
import { StyledAlert, StyledSnackbar } from './Snackbar.style';

const Snackbar: FunctionComponent<SnackbarProps> = props => {
  const { snackbarConfig, hideSnackbar } = useSnackbar();

  if (snackbarConfig === undefined) {
    return null;
  }

  return (
    <StyledSnackbar {...props} open autoHideDuration={6000} onClose={hideSnackbar}>
      <StyledAlert severity={snackbarConfig.severity}>{snackbarConfig.message}</StyledAlert>
    </StyledSnackbar>
  );
};

export default Snackbar;
