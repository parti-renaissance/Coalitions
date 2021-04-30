import styled, { css } from 'styled-components';
import {
  colorPalette,
  defaultMargins,
  fonts,
  fontWeight,
  getSpacing,
  media,
  ADDITIONAL_MARGIN_FOR_SHADOW,
} from 'stylesheet';

export const Container = styled.div`
  margin: 0 -${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    overflow: hidden;
    margin: 0 -${defaultMargins.horizontal.desktop};
    padding-bottom: ${ADDITIONAL_MARGIN_FOR_SHADOW}px;
  `)};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    margin: 0 ${defaultMargins.horizontal.desktop};
  `)};
`;

export const SeeAllButton = styled.div`
  ${fonts.button};
  font-weight: ${fontWeight.normal};
  color: ${colorPalette.blueCoalition};
  cursor: pointer;
  ${media.desktop(`
    margin-left: ${getSpacing(4)};
  `)}
`;

export const SubContainer = styled.div<{ height: number }>`
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-wrap: nowrap;
  overflow: scroll;
  margin-top: ${getSpacing(4)};
  padding-left: ${defaultMargins.horizontal.mobile};
  height: ${({ height }) => height + ADDITIONAL_MARGIN_FOR_SHADOW}px;
`;

export const CarouselWrapper = styled.div`
  ${media.desktop(`
    margin-top: ${getSpacing(4)};
  `)}
`;

export const RightHeaderSubContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CarouselControlsContainer = styled.div`
  display: none;
  ${media.desktop(`
    display: flex;
    align-items: center;
  `)}
`;

const ARROW_SIZE = '27.5px';

export const LeftArrow = styled.img`
  height: ${ARROW_SIZE};
  width: ${ARROW_SIZE};
`;

export const RightArrow = styled.img`
  transform: rotate(180deg);
  height: ${ARROW_SIZE};
  width: ${ARROW_SIZE};
`;

export const LoaderContainer = styled.div<{ mobileHeight: number; desktopHeight: number }>`
  margin-top: ${getSpacing(4)};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ mobileHeight, desktopHeight }) => css`
    height: ${mobileHeight}px;
    ${media.desktop(`
      height: ${desktopHeight}px;
    `)}
  `};
`;
