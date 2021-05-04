import styled from 'styled-components';
import { media, getSpacing, colorPalette } from 'stylesheet';

export const Title = styled.h3`
  color: ${colorPalette.greyDark};
`;

export const Image = styled.img`
  align-self: center;
  height: ${getSpacing(40)};
  width: ${getSpacing(40)};
  margin-bottom: ${getSpacing(3)};
  ${media.desktop(`
    height: ${getSpacing(50)};
    width: ${getSpacing(50)};
    margin-bottom: ${getSpacing(3)};
  `)}
`;

export const Content = styled.p`
  margin: ${getSpacing(3)} 0;
  text-align: center;
  ${media.desktop(`
    margin: ${getSpacing(5)};
    text-align: unset;
  `)}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  ${media.desktop(`
    align-items: unset;
  `)}
`;
