import styled from 'styled-components';
import { media, defaultMargins, getSpacing } from 'stylesheet';

export const Container = styled.div`
  overflow: hidden;
  padding-bottom: ${defaultMargins.vertical.mobile};
  ${media.desktop(`
    padding-bottom: ${defaultMargins.vertical.desktop};
  `)}
`;

export const Title = styled.h3`
  margin-left: ${defaultMargins.horizontal.mobile};
  margin-bottom: ${getSpacing(3)};
  ${media.desktop(`
    margin-left: ${defaultMargins.horizontal.desktop};
    margin-bottom: ${getSpacing(6)};
  `)}
`;

export const SubContainer = styled.div`
  margin: -${getSpacing(3)};
`;

export const SubSubContainer = styled.div`
  display: flex;
  overflow-y: scroll;
  padding: ${getSpacing(3)};
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const EmptyDiv = styled.div`
  min-width: ${getSpacing(3)};
`;
