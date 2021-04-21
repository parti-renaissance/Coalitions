import styled from 'styled-components';
import {
  getSpacing,
  media,
  fonts,
  colorPalette,
  defaultMargins,
  contentMaxWidth,
} from 'stylesheet';
import { DESKTOP_BUTTONS_WIDTH } from 'components/CauseDetails/components/HeaderButtons/HeaderButtons.style';

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${getSpacing(3)} ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    padding: ${getSpacing(8)} ${defaultMargins.horizontal.desktop};
    background-color: ${colorPalette.greyLight};
  `)}
`;

export const Image = styled.img`
  width: 100%;
  object-fit: cover;
  height: ${getSpacing(27)};
  ${media.desktop(`
    height: ${getSpacing(63)};
  `)};
`;

export const Title = styled.h1`
  ${fonts.h1Small};
  color: ${colorPalette.greyDark};
`;

export const ContentContainer = styled.div`
  padding: ${defaultMargins.vertical.mobile} ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
  `)};
`;

export const DescriptionWrapper = styled.div`
  ${media.desktop(`
    max-width: ${contentMaxWidth};
  `)};
`;

export const HeaderSubContainer = styled.div`
  ${media.desktop(`
    width: ${DESKTOP_BUTTONS_WIDTH};
  `)};
`;
