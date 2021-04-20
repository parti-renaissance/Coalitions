import styled from 'styled-components';
import { colorPalette, fonts, getSpacing, media } from 'stylesheet';

export const Container = styled.div`
  width: 100%;
`;

export const Title = styled.h3`
  display: none;
  ${media.desktop(`
    display: flex;
    color: ${colorPalette.greyDark};
    margin-bottom: ${getSpacing(5)};
  `)}
`;

export const QuickActionContainer = styled.div`
  margin-bottom: ${getSpacing(5)};
  cursor: pointer;
`;

export const QuickActionContentContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

export const QuickActionLabel = styled.div`
  ${fonts.button};
  color: ${colorPalette.blueCoalition};
  text-decoration: underline;
`;

export const QuickActionArrowRight = styled.img`
  height: ${getSpacing(5)};
  width: ${getSpacing(5)};
  margin-left: ${getSpacing(6)};
`;
