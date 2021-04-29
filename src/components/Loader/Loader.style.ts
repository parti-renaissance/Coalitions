import styled, { css } from 'styled-components';

export const LoaderContainer = styled.div<{ fullScreen?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ fullScreen }) =>
    fullScreen === true
      ? css`
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        `
      : css``}
`;
