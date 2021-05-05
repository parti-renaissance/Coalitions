import styled from 'styled-components';
import { getSpacing, media, fonts, fontWeight } from 'stylesheet';
import { MediumLargeButton as Button } from 'components/Button/Button';

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
        margin-right: ${getSpacing(3)};
      }
    }
    `)}
`;

export const ActionButton = styled(Button)`
  ${fonts.input}
  font-weight: ${fontWeight.bold};
  padding: ${getSpacing(2)};
`;
