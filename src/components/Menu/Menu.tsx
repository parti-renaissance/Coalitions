import React, { FunctionComponent } from 'react';
import { Container } from './Menu.style';
import { MenuProps } from '@material-ui/core/Menu';

const Menu: FunctionComponent<MenuProps> = props => {
  return <Container {...props} />;
};

export default Menu;
