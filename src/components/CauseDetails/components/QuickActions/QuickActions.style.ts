import styled from 'styled-components';
import { colorPalette, fonts, fontWeight, getSpacing, lineHeight, media } from 'stylesheet';

export const Container = styled.div`
  width: 100%;
`;

export const Title = styled.h3`
  display: none;
  ${media.desktop(`
    display: flex;
    color: ${colorPalette.greyDark};
    margin-bottom: ${getSpacing(5)};
  `)}
`;

export const QuickActionContainer = styled.div`
  margin-bottom: ${getSpacing(5)};
  cursor: pointer;
`;

export const QuickActionContentContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

const LABEL_DESCORATION_THICKNESS = '1px';
const LABEL_LETTER_SPACING = '0.25px';

export const QuickActionLabel = styled.div`
  ${fonts.button};
  line-height: ${lineHeight.primary};
  font-weight: ${fontWeight.veryBold};
  color: ${colorPalette.blueCoalition};
  text-decoration: underline;
  text-decoration-thickness: ${LABEL_DESCORATION_THICKNESS};
  letter-spacing: ${LABEL_LETTER_SPACING};
`;

export const QuickActionArrowRight = styled.img`
  height: ${getSpacing(5)};
  width: ${getSpacing(5)};
  margin-left: ${getSpacing(6)};
`;
