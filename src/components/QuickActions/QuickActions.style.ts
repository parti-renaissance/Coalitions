import { FullWidthButton } from 'components/Button/Button';
import styled from 'styled-components';
import { fonts, getSpacing, media } from 'stylesheet';

export const QuickActionsContainer = styled.div``;

export const QuickActionsTitle = styled.h1`
  ${fonts.h1Small};
  text-align: center;
  margin-bottom: ${getSpacing(10)};
  ${media.desktop(`
    margin-top: ${getSpacing(10)};
    margin-bottom: ${getSpacing(14)};
  `)};
`;

export const QuickActionsDescription = styled.p`
  padding: 0 ${getSpacing(3)};
  margin-bottom: ${getSpacing(8)};
  ${media.desktop(`
    padding: 0;
  `)};
`;

export const ValidateButton = styled(FullWidthButton)`
  margin-top: ${getSpacing(6)};
  ${media.desktop(`
    margin-top: ${getSpacing(8)};
  `)}
`;
