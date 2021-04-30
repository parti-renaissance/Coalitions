import styled from 'styled-components';
import { getSpacing, colorPalette, media } from 'stylesheet';

export const FirstNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const FirstName = styled.div`
  display: none;
  ${media.desktop(`
    display: flex;
    margin-left: ${getSpacing(2)};
    color: ${colorPalette.black};
  `)}
`;

export const ICON_SIZE = '20px';

export const UserIcon = styled.img`
  height: ${ICON_SIZE};
  width: ${ICON_SIZE};
`;
