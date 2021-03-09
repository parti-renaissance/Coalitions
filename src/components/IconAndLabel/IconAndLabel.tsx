import React, { FunctionComponent } from 'react';
import { Container, Icon } from './IconAndLabel.style';

interface IconAndLabelProps {
  Label: FunctionComponent<{}>;
  iconSrc: string;
}

const IconAndLabel: FunctionComponent<IconAndLabelProps> = ({ Label, iconSrc }) => (
  <Container>
    <Icon src={iconSrc} />
    <Label />
  </Container>
);

export default IconAndLabel;
