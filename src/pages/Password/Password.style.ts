import styled from 'styled-components';
import { getSpacing, media } from 'stylesheet';

export const PasswordFormWrapper = styled.div`
  max-width: ${getSpacing(85)};
  width: 100%;
  padding: 0 ${getSpacing(3)};
`;

export const PasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  ${media.desktop(`
    margin-top: ${getSpacing(20)};
  `)};
`;

export const SubmitButtonContainer = styled.div`
  margin: ${getSpacing(4)} 0;
  ${media.desktop(`
    margin: ${getSpacing(10)} 0;
  `)}
`;
