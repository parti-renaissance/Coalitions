import styled from 'styled-components';
import { colorPalette, getSpacing, media } from 'stylesheet';

export const Title = styled.h3`
  color: ${colorPalette.greyDark};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: ${getSpacing(2)};
  }

  ${media.desktop(`
    flex-direction: row;
    > * {
      flex: 1 1 content;
      :first-child {
        flex: 1 0 auto;
        margin-right: ${getSpacing(3)};
      }
    }
    `)}
`;

export const Description = styled.p`
  margin: ${getSpacing(5)} 0;
`;
