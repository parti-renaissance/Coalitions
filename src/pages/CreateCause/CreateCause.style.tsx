import styled from 'styled-components';
import { media, getSpacing } from 'stylesheet';
import { FULL_WIDTH_BUTTON_HEIGHT } from 'components/Button/Button';

export const Container = styled.div`
  ${media.desktop(`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${getSpacing(12)};
  `)}
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${getSpacing(7)} ${getSpacing(5)} ${FULL_WIDTH_BUTTON_HEIGHT} ${getSpacing(5)};
  ${media.desktop(`
    max-width: ${getSpacing(136)};
    padding: unset;
  `)}
`;

export const TopImage = styled.img`
  height: ${getSpacing(24)};
  width: ${getSpacing(24)};
  ${media.desktop(`
    height: ${getSpacing(33)};
    width: ${getSpacing(33)};
  `)}
`;
