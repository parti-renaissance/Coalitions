import styled, { css } from 'styled-components';
import {
  colorPalette,
  defaultMargins,
  getSpacing,
  media,
  borderRadius,
  boxShadow,
} from 'stylesheet';

const DESKTOP_MARGIN_BETWEEN_CARDS = getSpacing(10);

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colorPalette.white};
  border-radius: ${borderRadius.medium};
  box-shadow: ${boxShadow.card};
  ${media.desktop(`
    flex-direction: row;
    width: calc(
        calc(100vw - 2 * ${defaultMargins.horizontal.desktop} - ${DESKTOP_MARGIN_BETWEEN_CARDS}) / 2
      );
  `)}
`;

export const Image = styled.img`
  height: ${getSpacing(32)};
  width: 100%;
  ${media.desktop(`
    height: ${getSpacing(68)};
    width: 50%;
  `)}
`;

export const SubContainer = styled.div`
  display: flex;
  flex: 1;
  padding: ${getSpacing(5)};
`;
