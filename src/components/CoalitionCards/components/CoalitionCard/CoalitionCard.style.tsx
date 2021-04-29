import styled, { css } from 'styled-components';
import { getSpacing, media, borderRadius, colorPalette, fontSize, fontFamily } from 'stylesheet';
import { SmallButton } from 'components/Button/Button';

export const MARGIN_BETWEEN_CARDS = getSpacing(5);

export const Container = styled.div<{ responsiveNbOfCardsByLine?: boolean }>`
  border-radius: ${borderRadius.medium};
  overflow: hidden;
  position: relative;
  margin-bottom: ${getSpacing(3)};
  width: calc((100% - 2 * ${MARGIN_BETWEEN_CARDS}) / 2);
  margin-right: ${MARGIN_BETWEEN_CARDS};
  ${({ responsiveNbOfCardsByLine }) =>
    responsiveNbOfCardsByLine === true
      ? css`
          ${media.tablet(`
            width: calc(
              (100% - 3 * ${MARGIN_BETWEEN_CARDS}) / 3
            );
            ${media.desktop(`
              width: calc(
                (100% - 4 * ${MARGIN_BETWEEN_CARDS}) / 4
              );
              ${media.veryLargeDesktop(`
                width: calc(
                  (100% - 5 * ${MARGIN_BETWEEN_CARDS}) / 5
                );
              `)}
            `)}
        `)}
        `
      : css`
          ${media.desktop(`
            width: calc(
              (100% - 3 * ${MARGIN_BETWEEN_CARDS}) / 3
            );
          `)}
        `}
  ${media.desktop(`
    margin-bottom: ${getSpacing(4)};
  `)}
`;

export const Image = styled.div<{ backgroundImage: string }>`
  position: relative;
  border-radius: ${borderRadius.medium};
  width: 100%;
  padding-bottom: 56.25%;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  ${({ backgroundImage }) =>
    css`
      background-image: url(${backgroundImage});
    `};
`;

export const NameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${getSpacing(2)};
`;

export const Name = styled.p`
  display: flex;
  color: ${colorPalette.greyDark};
  align-items: center;
`;

const BORDER_WIDTH = '3px';

export const SelectedContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border-radius: ${borderRadius.medium};
  border: ${BORDER_WIDTH} solid ${colorPalette.mintGreen2};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MOBILE_INDEX_SIZE = getSpacing(5);
const DESKTOP_INDEX_SIZE = getSpacing(6);

export const SelectedIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${MOBILE_INDEX_SIZE};
  width: ${MOBILE_INDEX_SIZE};
  background-color: ${colorPalette.mintGreen};
  border-radius: 50%;
  color: ${colorPalette.blueCoalition};
  font-family: ${fontFamily.secondary};
  font-size: ${fontSize.button.mobile};
  ${media.desktop(`
    font-size: ${fontSize.button.desktop};
    height: ${DESKTOP_INDEX_SIZE};
    width: ${DESKTOP_INDEX_SIZE};
  `)}
`;

export const UnfollowButtonWrapper = styled.div`
  margin-top: 2px;
  ${media.desktop(`
    margin-top: ${getSpacing(1)};
  `)}
`;

export const FollowButton = styled(SmallButton)`
  background-color: ${colorPalette.blueCoalition}0A;
`;
