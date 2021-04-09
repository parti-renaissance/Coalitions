import styled from 'styled-components';
import { getSpacing, media, defaultMargins, fonts, colorPalette } from 'stylesheet';
import MenuItem from '@material-ui/core/MenuItem';

export const Container = styled.div`
  margin: ${getSpacing(3)} ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    margin: ${defaultMargins.vertical.desktop} auto;
    max-width: ${getSpacing(85)};
  `)};
`;

export const GenderItem = styled(MenuItem)`
  ${fonts.input};
  color: ${colorPalette.greyDark};
`;
