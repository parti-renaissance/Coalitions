import styled from 'styled-components';
import { media, getSpacing } from 'stylesheet';
import { FULL_WIDTH_BUTTON_HEIGHT } from 'components/Button/Button';

export const Container = styled.div`
  padding-bottom: ${FULL_WIDTH_BUTTON_HEIGHT};
  ${media.desktop(`
    padding-bottom: 0;
  `)}
`;

export const CauseDefinitionWrapper = styled.div`
  margin-top: ${getSpacing(3)};
  ${media.desktop(`
    margin-top: unset;
  `)}
`;
