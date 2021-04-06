import styled from 'styled-components';
import {
  media,
  getSpacing,
  colorPalette,
  fonts,
  fontFamily,
  fontSize,
  defaultMargins,
} from 'stylesheet';

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
    width: calc(calc(100% - 3 * ${getSpacing(10)}) / 4);
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
  a {
    color: ${colorPalette.greyDark};
  }
`;
