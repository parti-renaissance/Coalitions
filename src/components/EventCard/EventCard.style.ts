import styled from 'styled-components';
import {
  colorPalette,
  getSpacing,
  media,
  borderRadius,
  boxShadow,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  SPACING_UNIT,
} from 'stylesheet';
import { DefaultButton } from 'components/Button/Button';

export const DESKTOP_MARGIN_BETWEEN_CARDS = SPACING_UNIT * 6;
export const MOBILE_MARGIN_BETWEEN_CARDS = SPACING_UNIT * 3;
export const HEIGHT = SPACING_UNIT * 47;
export const DESKTOP_WIDTH = SPACING_UNIT * 69;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${getSpacing(5)};
  background-color: ${colorPalette.white};
  border-radius: ${borderRadius.medium};
  box-shadow: ${boxShadow.card};
  width: min(75vw, ${DESKTOP_WIDTH}px);
  min-width: min(75vw, ${DESKTOP_WIDTH}px);
  cursor: pointer;
  height: ${HEIGHT}px;
  box-sizing: border-box;
  ${media.desktop(`
    width: ${DESKTOP_WIDTH}px;
    min-width: unset;
  `)}
`;

export const MobileGreyP = styled.div`
  color: ${colorPalette.grey};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: ${fontFamily.primary};
  font-size: ${fontSize.p.mobile};
  line-height: ${lineHeight.primary};
  font-weight: ${fontWeight.normal};
  flex: 1;
`;

export const Name = styled.div`
  /*
     OK for all browser except IE which is not maintained anymore since Nov 2020
     cf: https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp
  */
  display: -webkit-box; /* stylelint-disable-line value-no-vendor-prefix */
  -webkit-box-orient: vertical; /* stylelint-disable-line property-no-vendor-prefix */
  -webkit-line-clamp: 2;
  overflow: hidden;
  flex-grow: 1;
  max-height: ${getSpacing(10)};
  font-family: ${fontFamily.secondary};
  font-size: ${fontSize.h1Small.mobile};
  line-height: ${lineHeight.secondary};
  color: ${colorPalette.greyDark};
  margin-top: ${getSpacing(1)};
`;

export const BottomButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${getSpacing(3)};
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SeeButton = styled(DefaultButton)`
  margin-left: ${getSpacing(3)};
`;

export const CategoryName = styled(MobileGreyP)`
  color: ${colorPalette.pink};
`;

export const ParticipantsCountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${getSpacing(1)};
`;

export const ParticipantsCountWrapper = styled.div`
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const PARTICIPANTS_COUNT_ICON_SIZE = getSpacing(3);

export const ParticipantsCountIcon = styled.img`
  height: ${PARTICIPANTS_COUNT_ICON_SIZE};
  width: ${PARTICIPANTS_COUNT_ICON_SIZE};
`;

export const ParticipantsCountLabel = styled(MobileGreyP)`
  color: ${colorPalette.greyDark};
  margin-left: ${getSpacing(2)};
`;
