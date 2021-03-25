import styled from 'styled-components';
import { getSpacing, colorPalette, media, fonts } from 'stylesheet';
import { MediumLargeButton } from 'components/Button/Button';
import { Container as FixedBottomButtonsContainer } from 'components/FixedBottomButton/FixedBottomButton.style';
import { DefaultLink } from 'components/Link/Link';

const DESKTOP_BUTTONS_WIDTH = '300px';

export const Container = styled.div`
  padding: ${getSpacing(3)} ${getSpacing(3)} ${getSpacing(2)} ${getSpacing(3)};
  ${media.desktop(`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${getSpacing(8)} ${getSpacing(12)};
    background-color: ${colorPalette.greyLight};
  `)}
`;

export const CoalitionName = styled.p`
  color: ${colorPalette.blueCoalition};
  margin-bottom: ${getSpacing(2)};
`;

export const AuthorAndSupportsWrapper = styled.div`
  margin-top: ${getSpacing(2)};
`;

export const CauseName = styled.h1`
  ${fonts.h1Small};
  color: ${colorPalette.greyDark};
`;

export const ButtonsContainer = styled(FixedBottomButtonsContainer)`
  display: flex;
  ${media.desktop(`
    flex-direction: column;
    min-width: ${DESKTOP_BUTTONS_WIDTH};
    margin-left: ${getSpacing(6)};
  `)}
`;

export const Button = styled(MediumLargeButton)`
  width: 100%;
  :nth-child(2) {
    margin-left: ${getSpacing(3)};
    ${media.desktop(`
      margin-left: unset;
      margin-top: ${getSpacing(3)};
    `)}
  }
`;

export const Link = styled(DefaultLink)`
  width: 100%;
`;
