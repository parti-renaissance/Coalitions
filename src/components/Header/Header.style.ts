import SmallButton from 'components/Button';
import styled from 'styled-components';
import { colorPalette, fonts, fontFamily, getSpacing } from 'stylesheet';

export const HeaderContainer = styled.header`
  ${fonts.menu};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  height: ${getSpacing(13)};
  padding: ${getSpacing(3)} ${getSpacing(10)};
`;

HeaderContainer.displayName = 'HeaderContainer';

export const HeaderSubContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  > * {
    padding: ${getSpacing(2)} ${getSpacing(5)};
  }
`;

export const HeaderTitle = styled.div`
  font-family: ${fontFamily.secondary};
  color: ${colorPalette.black};
`;

export const SubCategory = styled.div`
  color: ${colorPalette.blueCoalition};
`;

export const LogLink = styled.a`
  padding: ${getSpacing(2)} ${getSpacing(5)};
  margin-left: ${getSpacing(5)};
  color: ${colorPalette.black};
  text-decoration: none;
`;

export const CreateCauseButton = styled(SmallButton)`
  padding: ${getSpacing(3)} ${getSpacing(4)};
`;
