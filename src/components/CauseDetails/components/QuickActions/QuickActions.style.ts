import styled from 'styled-components';
import { colorPalette, getSpacing } from 'stylesheet';
import { FullWidthButton } from 'components/Button/Button';

export const Title = styled.h3`
  color: ${colorPalette.greyDark};
  margin-bottom: ${getSpacing(5)};
`;

export const QuickActionContainer = styled(FullWidthButton)`
  margin-bottom: ${getSpacing(5)};
  padding: 0;
`;

export const QuickActionContentContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

export const QuickActionLabel = styled.div`
  color: ${colorPalette.blueCoalition};
  text-decoration: underline;
`;

export const QuickActionArrowRight = styled.img`
  height: ${getSpacing(5)};
  width: ${getSpacing(5)};
  margin-left: ${getSpacing(6)};
`;
