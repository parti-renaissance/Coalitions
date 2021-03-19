import styled from 'styled-components';
import { colorPalette, getSpacing, media, fonts } from 'stylesheet';
import { MediumLargeButton } from 'components/Button/Button';

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

export const HeadSentence = styled.div`
  ${fonts.smallTitle};
  color: ${colorPalette.greyDark};
  margin-bottom: ${getSpacing(3)};
`;

export const DescriptionText = styled.p`
  color: ${colorPalette.greyDark};
  text-align: center;
`;

export const CTAButton = styled(MediumLargeButton)`
  margin-top: ${getSpacing(5)};
`;

export const CauseListButton = styled(CTAButton)`
  background-color: ${colorPalette.white};
  color: ${colorPalette.blueCoalition};
`;
