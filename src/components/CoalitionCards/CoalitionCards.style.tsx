import styled from 'styled-components';
import { MARGIN_BETWEEN_CARDS } from './components/CoalitionCard/CoalitionCard.style';

export const Container = styled.div`
  overflow: hidden;
`;

export const SubContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -${MARGIN_BETWEEN_CARDS};
`;
