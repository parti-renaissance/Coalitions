import styled from 'styled-components';
import { getSpacing, fonts, media, boxShadow } from 'stylesheet';
import Menu from '@material-ui/core/Menu';

export const Container = styled(Menu)`
  margin-top: ${getSpacing(8)};
  ${media.desktop(`
    margin-top: ${getSpacing(10)};
  `)};

  li,
  a {
    ${fonts.input};
    padding: ${getSpacing(2)} ${getSpacing(3)};
  }

  .MuiMenu-paper {
    box-shadow: ${boxShadow.card};
  }
`;
