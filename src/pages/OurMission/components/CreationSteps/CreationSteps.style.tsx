import styled from 'styled-components';
import {
  media,
  getSpacing,
  colorPalette,
  SPACING_UNIT,
  fonts,
  fontFamily,
  fontSize,
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
  ${fonts.h1};
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
  font-family: ${fontFamily.secondary};
  font-size: ${fontSize.h3.mobile};
  color: ${colorPalette.blueCoalition};
  ${media.desktop(`
    font-size: ${fontSize.h3.desktop};
  `)}
`;

export const StepText = styled.p`
  margin-left: ${getSpacing(2)};
  ${media.desktop(`
    margin-left: ${getSpacing(6)};
  `)}
`;
