import styled from 'styled-components';
import { media, getSpacing } from 'stylesheet';
import { FULL_WIDTH_BUTTON_HEIGHT } from 'components/Button/Button';

export const Container = styled.div`
  padding-bottom: calc(${FULL_WIDTH_BUTTON_HEIGHT} + ${getSpacing(6)});
  ${media.desktop(`
    padding-bottom: 0;
  `)}
`;
