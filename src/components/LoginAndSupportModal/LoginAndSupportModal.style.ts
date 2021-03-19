import { getSpacing, fontFamily, lineHeight, fontSize } from 'stylesheet';
import styled from 'styled-components';

export const FormControlLabelWrapper = styled.div`
  margin-top: ${getSpacing(5)};
`;

export const Label = styled.div`
  font-family: ${fontFamily.primary};
  line-height: ${lineHeight.primary};
  font-size: ${fontSize.p.mobile};
  margin-left: ${getSpacing(2)};
`;
