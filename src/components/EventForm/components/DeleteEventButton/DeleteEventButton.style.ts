import styled from 'styled-components';
import { getSpacing } from 'stylesheet';
import { FullWidthButton, MediumLargeButton } from 'components/Button/Button';

export const Container = styled(FullWidthButton)`
  margin-bottom: ${getSpacing(3)};
`;

export const ButtonsContainer = styled.div`
  display: flex;
`;

export const CloseModalButton = styled(MediumLargeButton)`
  margin-left: ${getSpacing(3)};
  min-width: fit-content;
`;

export const ModalContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;
