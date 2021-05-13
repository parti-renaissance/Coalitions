import styled from 'styled-components';
import { media, getSpacing, fonts, borderRadius, colorPalette } from 'stylesheet';
import { FullWidthButton } from 'components/Button/Button';

export const Container = styled.div``;

export const Title = styled.h1`
  ${fonts.h1Small};
  text-align: center;
`;

export const Description = styled.p`
  border-radius: ${borderRadius.medium};
  background-color: ${colorPalette.greyLight};
  color: ${colorPalette.greyDark};
  padding: ${getSpacing(3)};
  margin-top: ${getSpacing(6)};
  ${media.desktop(`
    margin-top: ${getSpacing(10)};
  `)}
`;

export const Form = styled.form`
  margin-top: ${getSpacing(5)};
  ${media.desktop(`
    margin-top: ${getSpacing(7)};
  `)}
`;

export const ValidateButton = styled(FullWidthButton)`
  margin-top: ${getSpacing(6)};
`;

export const InputFieldWrapper = styled.div`
  margin-top: ${getSpacing(4)};
`;
