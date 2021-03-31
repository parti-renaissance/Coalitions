import styled from 'styled-components';
import {
  media,
  getSpacing,
  colorPalette,
  SPACING_UNIT,
  fonts,
  fontFamily,
  fontSize,
  defaultMargins,
} from 'stylesheet';

const DESKTOP_MARGIN_BETWEEN_STEPS = SPACING_UNIT * 10;

export const Container = styled.div`
  background-color: ${colorPalette.mintGreen};
  padding: ${defaultMargins.vertical.mobile} ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
  `)}
`;

export const Title = styled.div`
  ${fonts.h1Small};
  color: ${colorPalette.greyDark};
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
    width: calc(${(window.innerWidth - 2 * DESKTOP_MARGIN_BETWEEN_STEPS) / 3}px - (2 / 3) * ${
    defaultMargins.horizontal.desktop
  });
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
  color: ${colorPalette.greyDark};
  margin-left: ${getSpacing(2)};
  ${media.desktop(`
    margin-left: ${getSpacing(6)};
  `)}
`;
