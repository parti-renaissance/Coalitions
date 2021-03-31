/* eslint-disable max-lines */

import { createMuiTheme } from '@material-ui/core';
import { css } from 'styled-components';

/**
 * App spacing measurement convention
 * Use the getSpacing function below to compute padding and margin
 */
export const SPACING_UNIT = 5;
const MEASUREMENT_UNIT = 'px';

/**
 * Do not use directly the colorPalette in your components
 * Create an entry in the colorUsage below instead
 */
export const colorPalette = {
  greyLight: '#F2F2F2',
  grey: '#979797',
  grey2: '#BDBDBD',
  grey3: '#828282',
  greyDark: '#222',
  amberLight: '#FFD54F',
  amber: '#FFC107',
  amberDark: '#FF8F00',
  blueLight: '#F4F9FB',
  blueCoalition: '#0029FF',
  white: '#FFFFFF',
  red: '#EB0303',
  redLight: '#FFDDDD',
  blackTransparent: 'rgba(0, 0, 0, 0.24)',
  blue: '#045BFF',
  black: '#000000',
  mintGreen: '#B2FFE5',
  mintGreen2: '#52DDAE',
  veryLightRed: '#FFD5C3',
  lightRed: '#E84D2B',
  veryLightYellow: '#FFE9C3',
  lightYellow: '#E89F2B',
  veryLightGreen: '#DAFFC3',
};

/**
 * Use this dictionnary in your components
 * Define a new key each time you use a colour if it's for a different use
 * Ex: fill, border-color, background-color, color ...
 */
export const colorUsage = {
  headerBackground: colorPalette.greyDark,
  primaryTextColor: colorPalette.greyDark,
  primaryLight: colorPalette.amberLight,
  primary: colorPalette.amber,
  primaryDark: colorPalette.amberDark,
  contentBackground: colorPalette.blueLight,
  linkColor: colorPalette.greyDark,
  linkColorHover: colorPalette.amberDark,
  linkColorDisabled: colorPalette.greyLight,
  codeColor: colorPalette.amberDark,
  primaryButtonColor: colorPalette.white,
  primaryButtonBackground: colorPalette.amberDark,
  primaryButtonBackgroundHover: colorPalette.amber,
  primaryButtonBackgroundDisabled: colorPalette.greyLight,
  loaderColorDefault: colorPalette.amberDark,
  error: colorPalette.red,
  inputBackground: colorPalette.white,
  inputBorderColor: colorPalette.blackTransparent,
  inputPlaceholderColor: colorPalette.blackTransparent,
};

export const borderRadius = {
  medium: '4px',
  large: '10px',
};

export const boxShadow = {
  card: `0px 4px 14px 0px rgba(0,0,0,0.1)`,
};

export const getSpacing = (multiplier: number): string =>
  `${multiplier * SPACING_UNIT}${MEASUREMENT_UNIT}`;

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: colorPalette.blueCoalition,
    },
    secondary: {
      main: colorPalette.mintGreen,
    },
  },
});

export const PHONE_BREAK_POINT = 425;
export const TABLET_BREAK_POINT = 768;
// Beyond this breakpoint screen are considered as large desktop
export const SMALL_DESKTOP_BREAK_POINT = 1250;
export const DESKTOP_BREAK_POINT = 1540;

export const media = {
  tablet: (styles: string) => `@media (min-width: ${PHONE_BREAK_POINT}px) {${styles}}`,
  desktop: (styles: string) => `@media (min-width: ${TABLET_BREAK_POINT}px) {${styles}}`,
  largeDesktop: (styles: string) =>
    `@media (min-width: ${SMALL_DESKTOP_BREAK_POINT}px) {${styles}}`,
  veryLargeDesktop: (styles: string) => `@media (min-width: ${DESKTOP_BREAK_POINT}px) {${styles}}`,
};

export const fontFamily = {
  primary: `'Poppins', sans-serif`,
  secondary: `'Yeseva One', cursive`,
};

export const fontWeight = {
  bold: '500',
  normal: '300',
};

export const defaultMarginsAsNumber = {
  horizontal: {
    desktop: 60,
    mobile: 15,
  },
  vertical: {
    desktop: 60,
    mobile: 35,
  },
};

export const defaultMargins = {
  horizontal: {
    desktop: `${defaultMarginsAsNumber.horizontal.desktop}px`,
    mobile: `${defaultMarginsAsNumber.horizontal.mobile}px`,
  },
  vertical: {
    desktop: `${defaultMarginsAsNumber.vertical.desktop}px`,
    mobile: `${defaultMarginsAsNumber.vertical.mobile}px`,
  },
};

export const fontSize = {
  h1: {
    mobile: '32px',
    desktop: '48px',
  },
  h1Small: {
    mobile: '22px',
    desktop: '34px',
  },
  h2: {
    mobile: '18px',
    desktop: '34px',
  },
  h3: {
    mobile: '18px',
    desktop: '24px',
  },
  p: {
    mobile: '16px',
    desktop: '20px',
  },
  input: {
    mobile: '16px',
    desktop: '18px',
  },
  smallButton: {
    mobile: '14px',
    desktop: '14px',
  },
  button: {
    mobile: '16px',
    desktop: '20px',
  },
};

export const lineHeight = {
  primary: '130%',
  secondary: '110%',
};

export const fonts = {
  h1: css`
    font-family: ${fontFamily.secondary};
    line-height: ${lineHeight.secondary};
    font-weight: ${fontWeight.normal};
    font-size: ${fontSize.h1.mobile};
    ${media.desktop(`
      font-size: ${fontSize.h1.desktop};
    `)}
  `,
  h1Small: css`
    font-family: ${fontFamily.secondary};
    line-height: ${lineHeight.secondary};
    font-weight: ${fontWeight.normal};
    font-size: ${fontSize.h1Small.mobile};
    ${media.desktop(`
      font-size: ${fontSize.h1Small.desktop};
    `)}
  `,
  h2: css`
    font-family: ${fontFamily.primary};
    line-height: ${lineHeight.primary};
    font-weight: ${fontWeight.bold};
    font-size: ${fontSize.h2.mobile};
    ${media.desktop(`
      font-size: ${fontSize.h2.desktop};
    `)}
  `,
  h3: css`
    font-family: ${fontFamily.primary};
    line-height: ${lineHeight.primary};
    font-weight: ${fontWeight.bold};
    font-size: ${fontSize.h3.mobile};
    ${media.desktop(`
      font-size: ${fontSize.h3.desktop};
    `)}
  `,
  p: css`
    font-family: ${fontFamily.primary};
    line-height: ${lineHeight.primary};
    font-weight: ${fontWeight.normal};
    font-size: ${fontSize.p.mobile};
    ${media.desktop(`
      font-size: ${fontSize.p.desktop};
    `)}
  `,
  input: css`
    font-family: ${fontFamily.primary};
    line-height: ${lineHeight.primary};
    font-size: ${fontSize.input.mobile};
    font-weight: ${fontWeight.normal};
    ${media.desktop(`
      font-size: ${fontSize.input.desktop};
    `)}
  `,
  smallButton: css`
    font-family: ${fontFamily.primary};
    font-weight: ${fontWeight.normal};
    font-size: ${fontSize.smallButton.mobile};
    ${media.desktop(`
      font-size: ${fontSize.smallButton.desktop};
    `)}
  `,
  button: css`
    font-family: ${fontFamily.primary};
    font-size: ${fontSize.button.mobile};
    font-weight: ${fontWeight.bold};
    ${media.desktop(`
      font-size: ${fontSize.button.desktop};
    `)}
  `,
};

export const styledTags = css`
  color: ${colorPalette.greyDark};
  h2 {
    ${fonts.h2};
  }
  h3 {
    ${fonts.h3};
  }
  p {
    ${fonts.p};
  }
  input {
    ${fonts.input};
  }
  textarea {
    ${fonts.input};
  }
`;

/* eslint-enable max-lines */
