import styled from 'styled-components';
import { getSpacing } from 'stylesheet';
import { FullWidthButton } from 'components/Button/Button';

export const Container = styled(FullWidthButton)`
  margin-bottom: ${getSpacing(3)};
`;
