import styled from 'styled-components';
import { media, getSpacing } from 'stylesheet';

export const InputFieldWrapper = styled.div`
  margin-top: ${getSpacing(3)};
  width: 100%;
`;

export const ValidateButtonContainer = styled.div`
  margin-top: auto;
  ${media.desktop(`
    margin-top: ${getSpacing(10)};
  `)}
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
