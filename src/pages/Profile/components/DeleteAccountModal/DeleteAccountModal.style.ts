import styled from 'styled-components';
import { getSpacing, media, fontSize } from 'stylesheet';

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: ${getSpacing(2)};
  }

  ${media.desktop(`
    flex-direction: row;
    > * {
      font-size: ${fontSize.button.mobile}
      flex: 1 1 content;
      :first-child {
        margin-right: ${getSpacing(3)};
      }
    }
    `)}
`;
