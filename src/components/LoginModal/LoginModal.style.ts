import styled from 'styled-components';
import { colorPalette, media, getSpacing, fonts } from 'stylesheet';

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
