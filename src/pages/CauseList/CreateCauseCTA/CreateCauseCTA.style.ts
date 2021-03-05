import styled from 'styled-components';
import { colorPalette, fontFamily, fontSize, fontWeight, getSpacing, media } from 'stylesheet';
import Button from '@material-ui/core/Button';

export const CTAContainer = styled.div`
  margin-bottom: ${getSpacing(4)};
  ${media.desktop(`
    flex: 0 0 100%;
  `)};
`;

export const CTABlock = styled.div`
  background-color: ${colorPalette.greyLight};
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
  margin-bottom: ${getSpacing(5)};
  text-align: center;
`;

export const CTAButton = styled(Button)`
  padding: ${getSpacing(3)} ${getSpacing(4)};
  font-family: ${fontFamily.main};
  font-size: ${fontSize.small};
  text-decoration: none;
  text-transform: none;
`;
