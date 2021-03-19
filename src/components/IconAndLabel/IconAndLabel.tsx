import React, { FunctionComponent } from 'react';
import { Container, Icon } from './IconAndLabel.style';

interface IconAndLabelProps {
  label: string;
  iconSrc: string;
}

const IconAndLabel: FunctionComponent<IconAndLabelProps> = ({ label, iconSrc }) => (
  <Container>
    <Icon src={iconSrc} />
    <p>{label}</p>
  </Container>
);

export default IconAndLabel;
