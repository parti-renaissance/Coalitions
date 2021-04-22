import styled from 'styled-components';
import { colorPalette, fonts, getSpacing, media, borderRadius } from 'stylesheet';

export const SendMailsTitle = styled.h1`
  ${fonts.h1Small};
  text-align: center;
  margin-bottom: ${getSpacing(10)};
  ${media.desktop(`
    margin-bottom: ${getSpacing(14)};
  `)};
`;

export const SendMailsDescription = styled.p`
  border-radius: ${borderRadius.medium};
  background-color: ${colorPalette.greyLight};
  color: ${colorPalette.greyDark};
  padding: ${getSpacing(3)};
  margin-bottom: ${getSpacing(8)};
  ${media.desktop(`
    padding: ${getSpacing(4)};
  `)}
`;
