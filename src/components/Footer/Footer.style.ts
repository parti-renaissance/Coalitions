import styled, { css } from 'styled-components';
import {
  media,
  defaultMargins,
  fontFamily,
  fontWeight,
  lineHeight,
  colorPalette,
  getSpacing,
} from 'stylesheet';
import { DefaultLink } from 'components/Link/Link';

export const Container = styled.footer`
  background-color: ${colorPalette.greyLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${defaultMargins.vertical.mobile} ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    flex-direction: row;
    justify-content: center;
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
  `)}
`;

const LINK_FONT_SIZE = '14px';

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  margin: ${getSpacing(1.5)} 0;
`;

const LINK_STYLE = css`
  font-family: ${fontFamily.primary};
  font-size: ${LINK_FONT_SIZE};
  font-weight: ${fontWeight.normal};
  line-height: ${lineHeight.primary};
  color: ${colorPalette.greyDark};
  text-decoration: unset;
  :hover {
    text-decoration: underline;
  }
`;

export const Link = styled(DefaultLink)`
  ${LINK_STYLE}
`;

export const ExternalLink = styled.a`
  ${LINK_STYLE}
`;

export const Separator = styled.div`
  display: none;
  ${media.desktop(`
    display: flex;
    font-family: ${fontFamily.primary};
    font-size: ${LINK_FONT_SIZE};
    font-weight: ${fontWeight.normal};
    line-height: ${lineHeight.primary};
    color: ${colorPalette.greyDark};
    margin: 0 ${getSpacing(1.5)};
  `)};
`;
