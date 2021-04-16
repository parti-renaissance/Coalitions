import { FullWidthButton } from 'components/Button/Button';
import styled from 'styled-components';
import { getSpacing, media } from 'stylesheet';

const ADD_ICON_SIZE = '20px';

export const AddIcon = styled.img`
  height: ${ADD_ICON_SIZE};
  width: ${ADD_ICON_SIZE};
  padding-right: ${getSpacing(2)};
`;

export const AddButtonContainer = styled(FullWidthButton)`
  ${media.desktop(`
    max-width: ${getSpacing(80)};
  `)}
`;
