import styled from 'styled-components';
import { colorPalette, defaultMargins, fonts, fontWeight, getSpacing, media } from 'stylesheet';
import {
  ADDITIONAL_MARGIN_FOR_SHADOW,
  MOBILE_CAUSE_MARGIN_RIGHT,
  MOBILE_CAUSE_CARD_HEIGHT,
} from 'components/Cause/Cause.style';

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
  margin-left: -${MOBILE_CAUSE_MARGIN_RIGHT / 2}px;
  padding-left: ${defaultMargins.horizontal.mobile};
  height: ${MOBILE_CAUSE_CARD_HEIGHT + ADDITIONAL_MARGIN_FOR_SHADOW}px;
`;

export const CarouselWrapper = styled.div`
  ${media.desktop(`
    margin-top: ${getSpacing(6)};
  `)}
`;
