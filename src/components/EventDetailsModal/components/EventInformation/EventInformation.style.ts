import styled from 'styled-components';
import { colorPalette, media, getSpacing, fonts, fontWeight, defaultMargins } from 'stylesheet';
import { SHADOW } from '../../../FixedBottomButton/FixedBottomButton.style';

export const Container = styled.div`
  background-color: ${colorPalette.greyLight};
  padding: ${getSpacing(6)};
  margin: ${getSpacing(6)} -${getSpacing(6)} 0 -${getSpacing(6)};
  ${media.desktop(`
    min-width: ${getSpacing(64)};
    margin: -64px -${getSpacing(8)} -${getSpacing(8)} ${getSpacing(6)};
    padding: 64px ${getSpacing(6)} ${getSpacing(6)} ${getSpacing(6)};
  `)}
`;

export const DesktopButtonsContainer = styled.div`
  display: none;
  ${media.desktop(`
    display: flex;
    flex-direction: column;
    > :first-child {
      margin-bottom: ${getSpacing(2)};
    }
  `)}
`;

export const MobileButtonsContainer = styled.div`
  margin-top: ${getSpacing(6)};
  ${media.desktop(`
    display: none;
  `)}
`;

export const SectionTitle = styled.div`
  ${fonts.h3};
  color: ${colorPalette.greyDark};
  :not(:nth-child(2)) {
    margin-top: ${getSpacing(6)};
  }

  ${media.desktop(`
    margin-top: ${getSpacing(6)};
  `)}
`;

export const OneInformationContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${getSpacing(3)};
`;

const ONE_INFORMATION_ICON_SIZE = getSpacing(4);

export const OneInformationIcon = styled.img`
  height: ${ONE_INFORMATION_ICON_SIZE};
  width: ${ONE_INFORMATION_ICON_SIZE};
`;

export const OneInformationLabel = styled.div<{ color?: string; bold?: boolean }>`
  ${fonts.input};
  color: ${({ color }) => (color !== undefined ? color : colorPalette.greyDark)};
  font-weight: ${({ bold }) => (bold === true ? fontWeight.bold : fontWeight.normal)};
  margin-left: ${getSpacing(2)};
  a {
    color: ${({ color }) => (color !== undefined ? color : colorPalette.greyDark)};
  }
`;

const MOBILE_PARTICIPATE_BUTTON_Z_INDEX = 1;

export const MobileEventParticipateButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${getSpacing(3)} ${defaultMargins.horizontal.mobile};
  background-color: ${colorPalette.white};
  display: flex;
  box-shadow: ${SHADOW};
  z-index: ${MOBILE_PARTICIPATE_BUTTON_Z_INDEX};
`;

export const ShareEventButtonWrapper = styled.div`
  > button,
  button:hover {
    color: ${colorPalette.pink};
    border-color: ${colorPalette.pink};
  }
`;
