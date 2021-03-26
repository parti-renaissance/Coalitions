import styled from 'styled-components';
import { getSpacing, media } from 'stylesheet';
import { MediumLargeButton } from 'components/Button/Button';
import { DefaultLink } from 'components/Link/Link';

export const Button = styled(MediumLargeButton)`
  width: 100%;
  :nth-child(2) {
    margin-left: ${getSpacing(3)};
    ${media.desktop(`
      margin-left: unset;
      margin-top: ${getSpacing(3)};
    `)}
  }
`;

export const Link = styled(DefaultLink)`
  width: 100%;
`;
