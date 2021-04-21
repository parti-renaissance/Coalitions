import { DefaultButton, FullWidthButton } from 'components/Button/Button';
import styled from 'styled-components';
import { colorPalette, fonts, getSpacing, media, borderRadius } from 'stylesheet';

export const QuickActionsContainer = styled.div``;

export const QuickActionsTitle = styled.h1`
  ${fonts.h1Small};
  text-align: center;
  margin-bottom: ${getSpacing(10)};
  ${media.desktop(`
    margin-bottom: ${getSpacing(14)};
  `)};
`;

export const QuickActionsDescription = styled.p`
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

export const QuickActionContainer = styled.div`
  margin-bottom: ${getSpacing(8)};
`;

export const QuickActionHeadLineContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

export const QuickActionDeleteButton = styled(DefaultButton)`
  ${fonts.p}
  border: none;
  color: ${colorPalette.blueCoalition};
`;
