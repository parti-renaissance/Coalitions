import styled, { css } from 'styled-components';
import { fontWeight, getSpacing, colorPalette, media, fonts } from 'stylesheet';
import { Tab } from '@material-ui/core';
import { Supported as OriginalSupported } from 'components/Cause/Cause.style';

const CONTAINER_MAX_WIDTH = '960px';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${getSpacing(3)};
  padding-bottom: 0;
  ${media.desktop(`
    padding: ${getSpacing(12)};
    padding-bottom: 0;
    max-width: ${CONTAINER_MAX_WIDTH};
    margin: auto;
  `)}
`;

export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const CauseImage = styled.div<{ backgroundImage: string }>`
  height: ${getSpacing(50)};
  ${({ backgroundImage }) =>
    css`
      background-image: url(${backgroundImage});
      background-position: top;
      background-repeat: no-repeat;
      background-size: cover;
    `};
  ${media.desktop(`
    height: ${getSpacing(88)};
    width: 100%;
  `)}
`;

export const TabsWrapper = styled.div`
  ${media.desktop(`
    margin-top: ${getSpacing(10)};
  `)}
`;

export const StyledTab = styled(Tab)`
  ${fonts.p};
  padding: ${getSpacing(2)} ${getSpacing(3)};
  text-transform: capitalize;
  ${({ selected }) =>
    css`
      opacity: ${Boolean(selected) ? 1 : 0.6};
      border-bottom: 2px solid ${colorPalette.greyLight};
      font-weight: ${selected ? fontWeight.bold : fontWeight.normal};
    `};
`;

export const Supported = styled(OriginalSupported)`
  right: -${getSpacing(3)};
`;

export const MobileHeaderWrapper = styled.div`
  ${media.desktop(`
    display: none;
  `)}
`;

export const DesktopHeaderWrapper = styled.div`
  display: none;
  ${media.desktop(`
    display: block;
    position: sticky;
    top: 0;
    z-index: 1;
  `)}
`;

export const CreateCauseCTAWrapper = styled.div`
  margin-top: ${getSpacing(5)};
  ${media.desktop(`
    margin-top: ${getSpacing(18)};
  `)}
`;
