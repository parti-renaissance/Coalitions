import styled from 'styled-components';
import { getSpacing, media } from 'stylesheet';
import { FULL_WIDTH_BUTTON_HEIGHT } from 'components/Button/Button';

export const Container = styled.div`
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  margin-top: ${getSpacing(6)};
  margin-bottom: calc(${FULL_WIDTH_BUTTON_HEIGHT} + ${getSpacing(6)});
  ${media.desktop(`
        margin-top: 0;
        margin-bottom: calc(${FULL_WIDTH_BUTTON_HEIGHT} + ${getSpacing(3)});
      `)}
`;
