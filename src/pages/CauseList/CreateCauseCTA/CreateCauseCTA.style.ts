import styled from 'styled-components';
import { colorPalette, fontSize, fontWeight, getSpacing, media } from 'stylesheet';
import SmallButton from 'components/Button';

export const CTAContainer = styled.div`
  margin: 0 -${getSpacing(3)} ${getSpacing(4)} -${getSpacing(3)};
  ${media.desktop(`
    flex: 0 0 100%;
  `)};
`;

export const CTABlock = styled.div`
  background-color: ${colorPalette.mintGreen};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${getSpacing(5)} ${getSpacing(8)};
  ${media.desktop(`
    margin: auto;
  `)};
`;

export const HeadSentence = styled.p`
  font-size: ${fontSize.xLarge};
  font-weight: ${fontWeight.bold};
  margin-bottom: ${getSpacing(3)};
`;

export const DescriptionText = styled.p`
  font-size: ${fontSize.mediumLarge};
  font-weight: ${fontWeight.light};
  text-align: center;
`;

export const CTAButton = styled(SmallButton)`
  padding: ${getSpacing(3)} ${getSpacing(4)};
  margin-top: ${getSpacing(5)};
`;

export const CauseListButton = styled(CTAButton)`
  background-color: ${colorPalette.white};
  color: ${colorPalette.blueCoalition};
`;
