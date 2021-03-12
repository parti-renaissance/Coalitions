import styled from 'styled-components';
import { getSpacing, fontSize, lineHeight, fontFamily, colorPalette, fontWeight } from 'stylesheet';

export const Container = styled.div`
  padding: ${getSpacing(3)} 0;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: ${fontSize.xLarge};
  font-weight: ${fontWeight.normal};
  line-height: ${lineHeight.large};
  font-family: ${fontFamily.abril};
  color: ${colorPalette.greyDark};
  margin: 0 ${getSpacing(3)};
  align-self: center;
  text-align: center;
`;
