import styled from 'styled-components';
import { colorPalette, getSpacing, fonts } from 'stylesheet';

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
