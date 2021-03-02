import styled from 'styled-components';
import { getSpacing } from 'stylesheet';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
HomeContainer.displayName = 'HomeContainer';

export const Logo = styled.img`
  width: ${getSpacing(32)};
  margin-bottom: ${getSpacing(4)};
`;
Logo.displayName = 'Logo';
