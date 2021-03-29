import styled from 'styled-components';
import { getSpacing, media } from 'stylesheet';

export const InscriptionFormWrapper = styled.div`
  max-width: ${getSpacing(85)};
  width: 100%;
  padding: 0 ${getSpacing(3)};
`;

export const InscriptionContainer = styled.div`
  display: flex;
  justify-content: center;
  ${media.desktop(`
    margin-top: ${getSpacing(20)};
  `)};
`;
