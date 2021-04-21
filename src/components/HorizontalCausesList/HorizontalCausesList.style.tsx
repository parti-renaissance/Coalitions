import styled from 'styled-components';
import { colorPalette, fonts, fontWeight, getSpacing, media } from 'stylesheet';
import { DefaultLink } from 'components/Link/Link';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SeeAllButton = styled(DefaultLink)`
  ${fonts.button};
  font-weight: ${fontWeight.normal};
  color: ${colorPalette.blueCoalition};
  cursor: pointer;
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-wrap: nowrap;
  overflow: scroll;
  margin: ${getSpacing(1)} -${getSpacing(3)} 0 -${getSpacing(3)};
  ${media.desktop(`
    height: ${getSpacing(97)};
    flex-wrap: wrap;
    overflow: hidden;
    justify-content: center;
    margin-top: ${getSpacing(6)};
  `)}

  > :first-child {
    margin-left: ${getSpacing(3)};
  }

  > * {
    min-width: ${getSpacing(50)};
    margin-right: ${getSpacing(3)};
    margin-top: ${getSpacing(3)};
    ${media.desktop(`
      min-width: ${getSpacing(62)};
    `)}
  }
`;

export const EmptyDiv = styled.div`
  min-width: ${getSpacing(3)};
  margin-left: -${getSpacing(3)};
`;

export const CauseWrapper = styled.div`
  display: flex;
  max-width: ${getSpacing(75)};
  ${media.desktop(`
    max-width: unset;
  `)}
`;
