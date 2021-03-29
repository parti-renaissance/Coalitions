import styled from 'styled-components';
import { media, getSpacing, defaultMargins } from 'stylesheet';
import InputField from 'components/InputField';
import { FullWidthButton } from 'components/Button/Button';

export const Container = styled.div`
  ${media.desktop(`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
  `)}
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${getSpacing(3)} ${defaultMargins.horizontal.mobile};
  padding-top: ${getSpacing(7)};
  ${media.desktop(`
    max-width: ${getSpacing(136)};
    padding: unset;
    padding-top: unset;
  `)}
`;

export const TopImage = styled.img`
  margin-bottom: -${getSpacing(5)};
  height: ${getSpacing(24)};
  width: ${getSpacing(24)};
  ${media.desktop(`
    height: ${getSpacing(33)};
    width: ${getSpacing(33)};
    margin-bottom: -${getSpacing(10)};
  `)}
`;

export const StyledInputDescription = styled(InputField)`
  margin-top: ${getSpacing(3)};
  ${media.desktop(`
    margin-top: ${getSpacing(6)};
  `)}
`;

export const ValidateButton = styled(FullWidthButton)`
  margin-top: ${getSpacing(6)};
  ${media.desktop(`
    margin-top: ${getSpacing(8)};
  `)}
`;
