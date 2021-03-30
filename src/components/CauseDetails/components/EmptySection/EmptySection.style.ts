import styled from 'styled-components';
import { getSpacing } from 'stylesheet';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Image = styled.img`
  width: ${getSpacing(43)};
  height: ${getSpacing(45)};
`;

export const Text = styled.p`
  text-align: center;
  font-style: italic;
  margin-top: ${getSpacing(6)};
  max-width: ${getSpacing(132)};
`;
