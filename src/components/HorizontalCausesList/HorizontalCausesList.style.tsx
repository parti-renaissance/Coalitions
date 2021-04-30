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
  DESKTOP_CAUSE_CARD_HEIGHT,
} from 'components/Cause/Cause.style';
import IconButton from '@material-ui/core/IconButton';

const MOBILE_CAUSE_MARGIN_RIGHT = SPACING_UNIT * 3;
export const DESKTOP_CAUSE_MARGIN_RIGHT = SPACING_UNIT * 8;

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
    margin-top: ${getSpacing(4)};
  `)}
`;

export const CauseCardWrapper = styled.div`
  margin-right: ${MOBILE_CAUSE_MARGIN_RIGHT}px;
`;

export const EmptyMobileDiv = styled.div`
  min-width: ${defaultMargins.horizontal.mobile};
  margin-left: -${MOBILE_CAUSE_MARGIN_RIGHT}px;
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

export const RightCarouselButton = styled(IconButton)`
  ${media.desktop(`
    margin-right: ${getSpacing(4)};
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

export const LoaderContainer = styled.div`
  margin-top: ${getSpacing(4)};
  height: ${MOBILE_CAUSE_CARD_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.desktop(`
    height: ${DESKTOP_CAUSE_CARD_HEIGHT}px;
  `)}
`;
