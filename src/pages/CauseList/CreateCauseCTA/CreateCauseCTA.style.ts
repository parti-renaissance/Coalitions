import styled from 'styled-components';
import { colorPalette, getSpacing, media, fonts, defaultMargins } from 'stylesheet';
import { MediumLargeButton } from 'components/Button/Button';

export const CTAContainer = styled.div`
  ${media.desktop(`
    flex: 0 0 100%;
  `)};
`;

export const CTABlock = styled.div`
  background-color: ${colorPalette.mintGreen};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${defaultMargins.vertical.mobile} ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
  `)};
`;

export const HeadSentence = styled.div`
  ${fonts.h1Small};
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
