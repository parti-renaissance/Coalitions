import React, { FunctionComponent } from 'react';
import { Container } from './FixedBottomButton.style';
import { FullWidthButton } from 'components/Button/Button';

interface FixedBottomButtonProps {
  onClick: () => void;
  label: string;
}

const FixedBottomButton: FunctionComponent<FixedBottomButtonProps> = ({ onClick, label }) => (
  <Container>
    <FullWidthButton size="small" variant="contained" color="primary" onClick={onClick}>
      {label}
    </FullWidthButton>
  </Container>
);

export default FixedBottomButton;
