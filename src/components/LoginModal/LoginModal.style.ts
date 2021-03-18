import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import styled from 'styled-components';
import {
  fontSize,
  colorPalette,
  media,
  getSpacing,
  lineHeight,
  fontWeight,
  fontFamily,
} from 'stylesheet';

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${getSpacing(3)};
  ${media.desktop(`
    min-width: ${getSpacing(100)};
    min-height: ${getSpacing(70)};
  `)}
`;

export const StyledCloseButton = styled(IconButton)`
  align-self: flex-end;
  padding: ${getSpacing(1)};
`;

const CLOSE_ICON_FONT_SIZE = '24px';

export const StyledCloseIcon = styled(Close)`
  font-size: ${CLOSE_ICON_FONT_SIZE};
  color: ${colorPalette.greyDark};
`;

export const Title = styled.div`
  font-family: ${fontFamily.main};
  font-size: ${fontSize.mediumLarge};
  font-weight: ${fontWeight.bold};
  margin-top: ${getSpacing(5)};
`;

export const Connect = styled.div`
  margin-top: ${getSpacing(3)};
  font-family: ${fontFamily.main};
  font-size: ${fontSize.medium};
  line-height: ${lineHeight.medium};
`;

export const ConnectLink = styled.a`
  color: ${colorPalette.mintGreen};
  text-decoration: underline;
  margin-left: ${getSpacing(1)};
  cursor: pointer;
`;

export const InputFieldWrapper = styled.div`
  margin-top: ${getSpacing(3)};
  width: 100%;
`;

export const ValidateButtonContainer = styled.div`
  ${media.desktop(`
    margin-top: ${getSpacing(10)};
  `)}
`;
