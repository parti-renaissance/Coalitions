import styled, { css } from 'styled-components';
import { media, defaultMargins, getSpacing } from 'stylesheet';

export const DESKTOP_MARGIN_BETWEEN_CARDS = getSpacing(10);
export const MOBILE_MARGIN_BETWEEN_CARDS = getSpacing(3);

export const Container = styled.div`
  padding: calc(${defaultMargins.vertical.mobile} - ${getSpacing(3)}) 0;
  ${media.desktop(`
    padding: calc(${defaultMargins.vertical.desktop} - ${getSpacing(3)}) 0;
  `)}
`;

export const SubContainer = styled.div`
  display: flex;
  overflow: scroll;
  padding: ${getSpacing(3)} 0;
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
