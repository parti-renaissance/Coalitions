import React, { FunctionComponent } from 'react';
import { Container, Icon, Label } from './IconAndLabel.style';

interface IconAndLabelProps {
  label: string;
  iconSrc: string;
  scale?: boolean;
}

const IconAndLabel: FunctionComponent<IconAndLabelProps> = ({ label, iconSrc, scale }) => (
  <Container>
    <Icon scale={scale} src={iconSrc} />
    <Label scale={scale}>{label}</Label>
  </Container>
);

export default IconAndLabel;
