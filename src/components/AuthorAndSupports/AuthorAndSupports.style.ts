import styled from 'styled-components';
import { getSpacing } from 'stylesheet';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const AuthorContainer = styled.div`
  margin-bottom: ${getSpacing(1)};
  :first-child {
    margin-right: ${getSpacing(3)};
  }
`;
