import styled, { css } from 'styled-components';
import {
  getSpacing,
  media,
  borderRadius,
  fontWeight,
  colorPalette,
  fontSize,
  fontFamily,
} from 'stylesheet';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: ${getSpacing(3)};
  ${media.desktop(`
    margin-top: ${getSpacing(6)};
  `)}
`;

const MARGIN_BETWEEN_CARDS = getSpacing(5);

export const CoalitionContainer = styled.div`
  position: relative;
  margin-bottom: ${getSpacing(3)};
  width: calc((100% - ${MARGIN_BETWEEN_CARDS}) / 2);
  ${media.desktop(`
    margin-bottom: ${getSpacing(4)};
    width: calc(
      (100% - 2 * ${MARGIN_BETWEEN_CARDS}) / 3
    );
  `)}
`;

export const CoalitionImage = styled.div<{ backgroundImage: string }>`
  position: relative;
  border-radius: ${borderRadius.medium};
  width: 100%;
  padding-bottom: 56.25%;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  ${({ backgroundImage }) =>
    css`
      background-image: url(${backgroundImage});
    `};
`;

export const CoalitionName = styled.p`
  color: ${colorPalette.greyDark};
  margin-top: ${getSpacing(2)};
`;

const BORDER_WIDTH = '3px';

export const SelectedCoalitionContainer = styled.div`
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

const MOBILE_COALITION_INDEX_SIZE = getSpacing(5);
const DESKTOP_COALITION_INDEX_SIZE = getSpacing(6);

export const SelectedCoalitionIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${MOBILE_COALITION_INDEX_SIZE};
  width: ${MOBILE_COALITION_INDEX_SIZE};
  background-color: ${colorPalette.mintGreen};
  border-radius: 50%;
  color: ${colorPalette.blueCoalition};
  font-family: ${fontFamily.secondary};
  font-size: ${fontSize.button.mobile};
  ${media.desktop(`
    font-size: ${fontSize.button.desktop};
    height: ${DESKTOP_COALITION_INDEX_SIZE};
    width: ${DESKTOP_COALITION_INDEX_SIZE};
  `)}
`;

export const NumberOfSelectedCauses = styled.p`
  color: ${colorPalette.greyDark};
  font-weight: ${fontWeight.bold};
  margin-bottom: ${getSpacing(3)};
  ${media.desktop(`
    margin-bottom: ${getSpacing(4)};
  `)}
`;

export const NormalWeight = styled.span`
  font-weight: ${fontWeight.normal};
`;
