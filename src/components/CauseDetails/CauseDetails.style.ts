import styled, { css } from 'styled-components';
import { fontWeight, getSpacing, colorPalette, media, fonts } from 'stylesheet';
import { Tab } from '@material-ui/core';
import { FULL_WIDTH_BUTTON_HEIGHT } from 'components/Button/Button';
import { MediumLargeButton } from 'components/Button/Button';
import { Supported as OriginalSupported } from 'components/Cause/Cause.style';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${getSpacing(3)} ${FULL_WIDTH_BUTTON_HEIGHT};
  ${media.desktop(`
    padding-bottom: 0;
  `)}
`;

export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const CauseImage = styled.div<{ backgroundImage: string }>`
  height: ${getSpacing(50)};
  margin: 0 -${getSpacing(3)};
  ${({ backgroundImage }) =>
    css`
      background-image: url(${backgroundImage});
      background-position: top;
      background-repeat: no-repeat;
      background-size: cover;
    `};
`;

export const CauseName = styled.p`
  ${fonts.h1};
`;
CauseName.displayName = 'CauseName';

export const CoalitionName = styled.p`
  ${fonts.p};
  color: ${colorPalette.blueCoalition};
  margin-bottom: ${getSpacing(2)};
`;
CoalitionName.displayName = 'CoalitionName';

export const HeaderSubContainer = styled.div`
  padding: ${getSpacing(3)} 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TabsWrapper = styled.div`
  margin: 0 -${getSpacing(3)};
  ${media.desktop(`
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  `)}
`;

export const StyledTab = styled(Tab)`
  padding: ${getSpacing(2)} ${getSpacing(3)};
  text-transform: capitalize;
  ${fonts.p};
  ${({ selected }) =>
    css`
      opacity: ${Boolean(selected) ? 1 : 0.6};
      border-bottom: 2px solid ${colorPalette.greyLight};
      font-weight: ${selected ? fontWeight.bold : fontWeight.normal};
    `};
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
    padding-left: ${getSpacing(10)};
    padding-right: ${getSpacing(10)};
  `)}
`;

export const Supported = styled(OriginalSupported)`
  right: -${getSpacing(3)};
`;
