import styled from 'styled-components';
import {
  media,
  getSpacing,
  fontSize,
  fontFamily,
  colorPalette,
  lineHeight,
  SPACING_UNIT,
} from 'stylesheet';

const DESKTOP_CONTAINER_HORIZONTAL_PADDING = SPACING_UNIT * 24;
const DESKTOP_MARGIN_BETWEEN_STEPS = SPACING_UNIT * 10;

export const Container = styled.div`
  padding: ${getSpacing(7)} ${getSpacing(3)};
  ${media.desktop(`
    padding: ${getSpacing(19)} ${DESKTOP_CONTAINER_HORIZONTAL_PADDING}px;
  `)}
`;

export const Title = styled.div`
  font-size: ${fontSize.xLarge};
  font-family: ${fontFamily.abril};
  color: ${colorPalette.greyDark};
  ${media.desktop(`
    font-size: ${fontSize.xxxLarge};
  `)}
`;

export const SubContainer = styled.div`
  ${media.desktop(`
    margin-top: ${getSpacing(10)};
    display: flex;
    justify-content: space-between;
  `)}
`;

export const StepContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${getSpacing(7)};
  ${media.desktop(`
    margin-top: 0;
    width: ${(window.innerWidth -
      2 * DESKTOP_CONTAINER_HORIZONTAL_PADDING -
      2 * DESKTOP_MARGIN_BETWEEN_STEPS) /
      3}px;
  `)}
`;

export const StepNumber = styled.div`
  font-size: ${fontSize.xLarge};
  font-family: ${fontFamily.abril};
  color: ${colorPalette.blueCoalition};
`;

export const StepText = styled.div`
  font-size: ${fontSize.small};
  line-height: ${lineHeight.small};
  font-family: ${fontFamily.main};
  color: ${colorPalette.greyDark};
  margin-left: ${getSpacing(2)};
  ${media.desktop(`
    font-size: ${fontSize.mediumLarge};
    line-height: ${lineHeight.medium};
    margin-left: ${getSpacing(6)};
  `)}
`;
