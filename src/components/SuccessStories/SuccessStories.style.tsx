import styled, { css } from 'styled-components';
import { media, defaultMargins, getSpacing } from 'stylesheet';

export const DESKTOP_MARGIN_BETWEEN_CARDS = getSpacing(10);
export const MOBILE_MARGIN_BETWEEN_CARDS = getSpacing(3);

export const Container = styled.div`
  overflow: hidden;
  padding-bottom: ${defaultMargins.vertical.mobile};
  ${media.desktop(`
    padding-bottom: ${defaultMargins.vertical.desktop};
  `)}
`;

export const Title = styled.h3`
  margin-left: ${defaultMargins.horizontal.mobile};
  margin-bottom: ${getSpacing(3)};
  ${media.desktop(`
    margin-left: ${defaultMargins.horizontal.desktop};
    margin-bottom: ${getSpacing(6)};
  `)}
`;

export const SubContainer = styled.div`
  margin: -${getSpacing(3)};
`;

export const SubSubContainer = styled.div`
  display: flex;
  overflow-y: scroll;
  padding: ${getSpacing(3)};
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SuccessStoryCardWrapper = styled.div<{ isFirst: boolean; show: boolean }>`
  margin-right: ${MOBILE_MARGIN_BETWEEN_CARDS};
  ${media.desktop(`
    margin-right: ${DESKTOP_MARGIN_BETWEEN_CARDS};
  `)};
  ${({ isFirst }) =>
    isFirst
      ? css`
          margin-left: ${defaultMargins.horizontal.mobile};
          ${media.desktop(`
            margin-left: ${defaultMargins.horizontal.desktop};
          `)}
        `
      : css``};
  ${({ show }) =>
    show
      ? css``
      : css`
          ${media.desktop(`
            display: none;
          `)}
        `};
`;

export const EmptyDiv = styled.div`
  min-width: ${getSpacing(3)};
`;
