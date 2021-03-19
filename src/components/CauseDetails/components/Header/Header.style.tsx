import styled from 'styled-components';
import { getSpacing, colorPalette, media } from 'stylesheet';
import { MediumLargeButton } from 'components/Button/Button';

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

export const MobileSupportButtonWrapper = styled.div`
  ${media.desktop(`
    display: none;
  `)}
`;

export const DesktopSupportButton = styled(MediumLargeButton)`
  display: none;
  ${media.desktop(`
    display: block;
    padding-left: ${getSpacing(14)};
    padding-right: ${getSpacing(14)};
    margin-left: ${getSpacing(6)};
  `)}
`;

export const CauseName = styled.h1`
  color: ${colorPalette.greyDark};
`;
