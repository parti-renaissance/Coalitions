import styled from 'styled-components';
import { media, getSpacing } from 'stylesheet';

export const InputFieldWrapper = styled.div`
  margin-top: ${getSpacing(3)};
  width: 100%;
`;

export const ValidateButtonContainer = styled.div`
  ${media.desktop(`
    margin-top: ${getSpacing(10)};
  `)}
`;
