import styled from 'styled-components';
import {
  colorPalette,
  defaultMargins,
  fonts,
  fontWeight,
  getSpacing,
  media,
  SPACING_UNIT,
} from 'stylesheet';
import {
  ADDITIONAL_MARGIN_FOR_SHADOW,
  MOBILE_CAUSE_CARD_HEIGHT,
} from 'components/Cause/Cause.style';

const MOBILE_CAUSE_MARGIN_RIGHT = SPACING_UNIT * 3;
export const DESKTOP_CAUSE_MARGIN_RIGHT = SPACING_UNIT * 8;

export const Container = styled.div`
  margin: 0 -${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    margin: 0 -${defaultMargins.horizontal.desktop};
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
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-wrap: nowrap;
  overflow: scroll;
  margin-top: ${getSpacing(4)};
  padding-left: ${defaultMargins.horizontal.mobile};
  height: ${MOBILE_CAUSE_CARD_HEIGHT + ADDITIONAL_MARGIN_FOR_SHADOW}px;
`;

export const CarouselWrapper = styled.div`
  ${media.desktop(`
    margin-top: ${getSpacing(6)};
  `)}
`;

export const CauseCardWrapper = styled.div`
  margin-right: ${MOBILE_CAUSE_MARGIN_RIGHT}px;
  ${media.desktop(`
    margin-right: ${DESKTOP_CAUSE_MARGIN_RIGHT}px;
  `)}
`;

export const EmptyMobileDiv = styled.div`
  min-width: ${defaultMargins.horizontal.mobile};
  margin-left: -${MOBILE_CAUSE_MARGIN_RIGHT}px;
  ${media.desktop(`
    display: none;
  `)}
`;
