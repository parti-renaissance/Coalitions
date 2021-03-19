import styled from 'styled-components';
import {
  getSpacing,
  media,
  borderRadius,
  fontWeight,
  colorPalette,
  fonts,
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

const MOBILE_IMAGE_HEIGHT = getSpacing(18);
const DESKTOP_IMAGE_HEIGHT = getSpacing(25);

export const CoalitionImage = styled.img`
  border-radius: ${borderRadius.medium};
  width: 100%;
  height: ${MOBILE_IMAGE_HEIGHT};
  ${media.desktop(`
    height: ${DESKTOP_IMAGE_HEIGHT};
  `)}
`;

export const CoalitionName = styled.div`
  ${fonts.p};
  margin-top: ${getSpacing(2)};
`;

const BORDER_WIDTH = '3px';

export const SelectedCoalitionContainer = styled.div`
  position: absolute;
  top: 0;
  height: ${MOBILE_IMAGE_HEIGHT};
  width: 100%;
  box-sizing: border-box;
  border-radius: ${borderRadius.medium};
  border: ${BORDER_WIDTH} solid ${colorPalette.mintGreen2};
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.desktop(`
    height: ${DESKTOP_IMAGE_HEIGHT};
  `)}
`;

const MOBILE_COALITION_INDEX_SIZE = getSpacing(5);
const DESKTOP_COALITION_INDEX_SIZE = getSpacing(6);

const INDEX_FONT_SIZE = '18px';

export const SelectedCoalitionIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${MOBILE_COALITION_INDEX_SIZE};
  width: ${MOBILE_COALITION_INDEX_SIZE};
  background-color: ${colorPalette.mintGreen};
  border-radius: 50%;
  font-family: ${fontFamily.secondary};
  font-size: ${INDEX_FONT_SIZE};
  color: ${colorPalette.blueCoalition};
  ${media.desktop(`
    height: ${DESKTOP_COALITION_INDEX_SIZE};
    width: ${DESKTOP_COALITION_INDEX_SIZE};
  `)}
`;

export const NumberOfSelectedCauses = styled.div`
  ${fonts.h3};
  margin-bottom: ${getSpacing(3)};
  ${media.desktop(`
    margin-bottom: ${getSpacing(4)};
  `)}
`;

export const NormalWeight = styled.span`
  font-weight: ${fontWeight.normal};
`;
