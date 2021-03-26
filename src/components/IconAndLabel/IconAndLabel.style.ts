import styled from 'styled-components';
import { getSpacing, colorPalette, fontFamily, fontSize, lineHeight, fontWeight } from 'stylesheet';

const ICON_SIZE = '16px';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Icon = styled.img`
  height: ${ICON_SIZE};
  width: ${ICON_SIZE};
  margin-right: ${getSpacing(2)};
`;

export const Label = styled.div`
  font-family: ${fontFamily.primary};
  font-size: ${fontSize.p.mobile};
  line-height: ${lineHeight.primary};
  color: ${colorPalette.greyDark};
  font-weight: ${fontWeight.normal};
`;
