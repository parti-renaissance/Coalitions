import styled from 'styled-components';
import { defaultMargins, getSpacing, media, styledTags } from 'stylesheet';
import { MediumLargeButton } from 'components/Button/Button';

export const Wrapper = styled.main`
  height: 100%;
`;

export const Container = styled.div`
  ${styledTags};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: ${getSpacing(3)} ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
  `)}
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IMAGE_WIDTH = getSpacing(51);
const IMAGE_HEIGHT = getSpacing(45);

export const Image = styled.img`
  width: ${IMAGE_WIDTH};
  height: ${IMAGE_HEIGHT};
`;

export const Description = styled.p`
  font-style: italic;
  margin-top: ${getSpacing(12)};
  text-align: center;
  max-width: ${getSpacing(120)};
`;

export const Button = styled(MediumLargeButton)`
  width: 100%;
  :last-child {
    margin-top: ${getSpacing(3)};
  }
  ${media.desktop(`
    width: ${getSpacing(60)};
    :last-child {
      margin-top: unset;
      margin-left: ${getSpacing(3)};
    }
  `)}
`;
