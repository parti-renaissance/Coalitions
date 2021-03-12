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
import { FULL_WIDTH_BUTTON_HEIGHT } from 'components/Button/Button';

export const Container = styled.div`
  padding-bottom: ${FULL_WIDTH_BUTTON_HEIGHT};
  ${media.desktop(`
    padding-bottom: 0;
  `)}
`;

export const CauseDefinitionWrapper = styled.div`
  margin-top: ${getSpacing(3)};
  ${media.desktop(`
    margin-top: unset;
  `)}
`;

const DESKTOP_CREATION_STEPS_CONTAINER_HORIZONTAL_PADDING = SPACING_UNIT * 24;
const DESKTOP_MARGIN_BETWEEN_CREATION_STEPS = SPACING_UNIT * 10;

export const CreationStepsContainer = styled.div`
  padding: ${getSpacing(7)} ${getSpacing(3)};
  ${media.desktop(`
    padding: ${getSpacing(19)} ${DESKTOP_CREATION_STEPS_CONTAINER_HORIZONTAL_PADDING}px;
  `)}
`;

export const CreationStepsTitle = styled.div`
  font-size: ${fontSize.xLarge};
  font-family: ${fontFamily.abril};
  color: ${colorPalette.greyDark};
  ${media.desktop(`
    font-size: ${fontSize.xxxLarge};
  `)}
`;

export const CreationStepsSubContainer = styled.div`
  ${media.desktop(`
    margin-top: ${getSpacing(10)};
    display: flex;
    justify-content: space-between;
  `)}
`;

export const CreationStepContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${getSpacing(7)};
  ${media.desktop(`
    margin-top: 0;
    width: ${(window.innerWidth -
      2 * DESKTOP_CREATION_STEPS_CONTAINER_HORIZONTAL_PADDING -
      2 * DESKTOP_MARGIN_BETWEEN_CREATION_STEPS) /
      3}px;
  `)}
`;

export const CreationStepNumber = styled.div`
  font-size: ${fontSize.xLarge};
  font-family: ${fontFamily.abril};
  color: ${colorPalette.blueCoalition};
`;

export const CreationStepText = styled.div`
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
