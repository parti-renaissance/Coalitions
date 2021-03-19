import styled from 'styled-components';
import { colorUsage, getSpacing, fonts } from 'stylesheet';

export const Label = styled.h3`
  display: block;
  margin-bottom: ${getSpacing(1)};
`;

export const Error = styled.p`
  color: ${colorUsage.error};
  margin-top: ${getSpacing(1)};
`;

export const Row = styled.div`
  margin-bottom: ${getSpacing(5)};
  width: 100%;
`;
