import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import styled from 'styled-components';
import { colorPalette, media, getSpacing, fonts, styledTags } from 'stylesheet';
import { Dialog } from '@material-ui/core';

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 ${getSpacing(3)} ${getSpacing(3)} ${getSpacing(3)};
  ${media.desktop(`
    width: ${getSpacing(74)};
    padding: 0 ${getSpacing(8)} ${getSpacing(8)} ${getSpacing(8)};
  `)}
`;

export const StyledCloseButton = styled(IconButton)`
  align-self: flex-end;
  padding: ${getSpacing(3)};
  ${media.desktop(`
    margin: ${getSpacing(2)} ${getSpacing(5)};
  `)}
`;

const CLOSE_ICON_FONT_SIZE = '24px';

export const StyledCloseIcon = styled(Close)`
  font-size: ${CLOSE_ICON_FONT_SIZE};
  color: ${colorPalette.greyDark};
`;

export const Title = styled.h3`
  color: ${colorPalette.greyDark};
  margin-top: ${getSpacing(5)};
`;

export const Connect = styled.div`
  display: flex;
  margin-top: ${getSpacing(3)};
`;

export const ConnectLink = styled.a`
  ${fonts.p};
  color: ${colorPalette.mintGreen};
  text-decoration: underline;
  margin-left: ${getSpacing(1)};
  cursor: pointer;
`;

export const StyledDialog = styled(Dialog)`
  ${styledTags}
`;

export const SuccessImage = styled.img`
  align-self: center;
  height: ${getSpacing(24)};
  width: ${getSpacing(24)};
  margin-bottom: ${getSpacing(3)};
  ${media.desktop(`
    height: ${getSpacing(33)};
    width: ${getSpacing(33)};
    margin-bottom: ${getSpacing(3)};
  `)}
`;

export const SuccessText = styled.p`
  margin-top: ${getSpacing(3)};
  text-align: center;
  ${media.desktop(`
    margin-top: ${getSpacing(5)};
    text-align: unset;
  `)}
`;

export const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  ${media.desktop(`
    align-items: unset;
  `)}
`;
