import styled from 'styled-components';
import { getSpacing, media, defaultMargins, fonts, colorPalette, borderRadius } from 'stylesheet';
import MenuItem from '@material-ui/core/MenuItem';

export const Container = styled.div`
  margin: ${getSpacing(3)} ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    margin: ${defaultMargins.vertical.desktop} auto;
    max-width: ${getSpacing(100)};
  `)};
`;

export const GenderItem = styled(MenuItem)`
  ${fonts.input};
  color: ${colorPalette.greyDark};
`;

export const AdherentText = styled.p`
  border-radius: ${borderRadius.medium};
  background-color: ${colorPalette.greyLight};
  color: ${colorPalette.greyDark};
  padding: ${getSpacing(3)};
  margin-bottom: ${defaultMargins.vertical.mobile};
  ${media.desktop(`
    padding: ${getSpacing(4)};
    margin-bottom: ${defaultMargins.vertical.desktop};
  `)}
  a {
    color: ${colorPalette.blueCoalition};
  }
`;

export const PhoneContainer = styled.div`
  margin-top: ${getSpacing(3)};
  ${media.desktop(`
  display: flex;
  flex-direction: row;

  > * {
    flex: 1 0 50%;
  }`)};
`;

export const AutocompleteWrapper = styled.div`
  margin-bottom: ${getSpacing(4)};
  ${media.desktop(`
    margin-right: ${getSpacing(2)};
    margin-bottom: unset;
  `)}
`;
