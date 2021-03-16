import styled from 'styled-components';
import { getSpacing, media, fontSize, fontFamily, lineHeight, borderRadius } from 'stylesheet';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: ${getSpacing(3)};
  ${media.desktop(`
    margin-top: ${getSpacing(6)};
  `)}
`;

const MARGIN_BETWEEN_CARDS = getSpacing(5);

export const CoalitionContainer = styled.div`
  margin-bottom: ${getSpacing(3)};
  width: calc((100% - ${MARGIN_BETWEEN_CARDS}) / 2);
  ${media.desktop(`
    margin-bottom: ${getSpacing(4)};
    width: calc(
      (100% - ${MARGIN_BETWEEN_CARDS} - ${MARGIN_BETWEEN_CARDS}) / 3
    );
  `)}
`;

export const CoalitionImage = styled.img`
  border-radius: ${borderRadius.medium};
  width: 100%;
  height: ${getSpacing(18)};
  ${media.desktop(`
    height: ${getSpacing(25)};
  `)}
`;

export const CoalitionName = styled.div`
  font-family: ${fontFamily.main};
  font-size: ${fontSize.small};
  line-height: ${lineHeight.small};
  margin-top: ${getSpacing(2)};
`;
