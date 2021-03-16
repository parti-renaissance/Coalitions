import React, { FunctionComponent } from 'react';
import { Container } from './FixedBottomButton.style';
import { FullWidthButton } from 'components/Button/Button';
import { ButtonProps } from '@material-ui/core/Button';

const FixedBottomButton: FunctionComponent<ButtonProps & { isLoading?: boolean }> = props => (
  <Container>
    <FullWidthButton {...props} size="small" variant="contained" color="primary" />
  </Container>
);

export default FixedBottomButton;
