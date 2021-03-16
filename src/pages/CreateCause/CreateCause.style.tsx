import styled from 'styled-components';
import { media, getSpacing } from 'stylesheet';
import { FULL_WIDTH_BUTTON_HEIGHT } from 'components/Button/Button';
import InputField from 'components/InputField';

export const Container = styled.div`
  ${media.desktop(`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${getSpacing(12)};
  `)}
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${getSpacing(7)} ${getSpacing(3)} ${FULL_WIDTH_BUTTON_HEIGHT} ${getSpacing(3)};
  ${media.desktop(`
    max-width: ${getSpacing(136)};
    padding: unset;
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
