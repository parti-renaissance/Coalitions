import styled from 'styled-components';
import { getSpacing, media } from 'stylesheet';

export const Image = styled.img`
  width: 100%;
  object-fit: cover;
  height: ${getSpacing(27)};
  ${media.desktop(`
    height: ${getSpacing(63)};
  `)};
`;
