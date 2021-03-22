import React, { FunctionComponent } from 'react';
import { Container, Icon, Label } from './IconAndLabel.style';

interface IconAndLabelProps {
  label: string;
  iconSrc: string;
}

const IconAndLabel: FunctionComponent<IconAndLabelProps> = ({ label, iconSrc }) => (
  <Container>
    <Icon src={iconSrc} />
    <Label>{label}</Label>
  </Container>
);

export default IconAndLabel;
