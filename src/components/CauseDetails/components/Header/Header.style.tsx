import styled from 'styled-components';
import { fontFamily, fontSize, getSpacing, colorPalette, media } from 'stylesheet';
import { MediumLargeButton } from 'components/Button/Button';

export const Container = styled.div`
  padding: ${getSpacing(3)} 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CauseName = styled.p`
  font-family: ${fontFamily.abril};
  font-size: ${fontSize.large};
`;
CauseName.displayName = 'CauseName';

export const CoalitionName = styled.p`
  font-size: ${fontSize.small};
  color: ${colorPalette.blueCoalition};
  margin-bottom: ${getSpacing(2)};
`;
CoalitionName.displayName = 'CoalitionName';

export const AuthorAndSupportsWrapper = styled.div`
  margin-top: ${getSpacing(2)};
`;

export const MobileSupportButtonWrapper = styled.div`
  z-index: 1;
  ${media.desktop(`
    display: none;
  `)}
`;

export const DesktopSupportButton = styled(MediumLargeButton)`
  display: none;
  ${media.desktop(`
    display: block;
    padding-left: ${getSpacing(10)};
    padding-right: ${getSpacing(10)};
  `)}
`;
