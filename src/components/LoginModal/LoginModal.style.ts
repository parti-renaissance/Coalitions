import styled from 'styled-components';
import { colorPalette, getSpacing, fonts } from 'stylesheet';
import { FULL_WIDTH_BUTTON_HEIGHT } from 'components/Button/Button';

export const Connect = styled.div`
  ${fonts.input};
  display: flex;
  margin-top: ${getSpacing(3)};
`;

export const ConnectLink = styled.a`
  color: ${colorPalette.mintGreen};
  text-decoration: underline;
  margin-left: ${getSpacing(1)};
  cursor: pointer;
`;

export const ContentContainer = styled.div`
  overflow: scroll;
  padding-bottom: calc(${FULL_WIDTH_BUTTON_HEIGHT} + ${getSpacing(5)});
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
