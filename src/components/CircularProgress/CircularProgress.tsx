import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';
import { colorPalette } from 'stylesheet';

const StyledCircularProgress = styled(CircularProgress)<{ customVariant?: string }>`
  color: ${({ customVariant }) =>
    customVariant === 'outlined' ? colorPalette.blueCoalition : colorPalette.white};
`;

export default StyledCircularProgress;
