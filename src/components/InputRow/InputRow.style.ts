import styled from 'styled-components';
import { colorUsage, getSpacing, fonts } from 'stylesheet';

export const Label = styled.label`
  display: block;
  ${fonts.h3};
  margin-bottom: ${getSpacing(1)};
`;

export const Error = styled.p`
  ${fonts.p};
  color: ${colorUsage.error};
  margin-top: ${getSpacing(1)};
`;

export const Row = styled.div`
  margin-bottom: ${getSpacing(5)};
  width: 100%;
`;
