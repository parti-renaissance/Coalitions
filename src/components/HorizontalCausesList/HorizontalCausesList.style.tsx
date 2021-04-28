import styled from 'styled-components';
import { colorPalette, defaultMargins, fonts, fontWeight, getSpacing, media } from 'stylesheet';
import {
  ADDITIONAL_MARGIN_FOR_SHADOW,
  MOBILE_CAUSE_MARGIN_RIGHT,
} from 'components/Cause/Cause.style';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin: ${getSpacing(4)} -${MOBILE_CAUSE_MARGIN_RIGHT} 0 -${ADDITIONAL_MARGIN_FOR_SHADOW};
`;

export const CarouselWrapper = styled.div`
  ${media.desktop(`
    margin: ${getSpacing(6)} 0 -${ADDITIONAL_MARGIN_FOR_SHADOW} -${ADDITIONAL_MARGIN_FOR_SHADOW};
  `)}
`;

export const MobileEmptyDiv = styled.div`
  min-width: ${defaultMargins.horizontal.mobile};
  margin-left: -${MOBILE_CAUSE_MARGIN_RIGHT};
  ${media.desktop(`
    display: none;
  `)}
`;
