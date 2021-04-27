import { FullWidthButton } from 'components/Button/Button';
import styled from 'styled-components';
import { colorPalette, fonts, fontWeight, getSpacing, media, borderRadius } from 'stylesheet';

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

export const ValidateButton = styled(FullWidthButton)`
  margin-top: ${getSpacing(6)};
  ${media.desktop(`
    margin-top: ${getSpacing(8)};
  `)}
`;

export const EditorContainer = styled.div`
  font-weight: ${fontWeight.normal};
`;
