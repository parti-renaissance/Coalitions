import { Severity } from 'redux/Snackbar/types';
import { colorPalette } from 'stylesheet';

export const getColorsFromSeverity = (severity: Severity): { icon: string; background: string } => {
  switch (severity) {
    case Severity.success:
      return {
        icon: colorPalette.mintGreen2,
        background: colorPalette.veryLightGreen,
      };
    case Severity.error:
      return {
        icon: colorPalette.lightYellow,
        background: colorPalette.veryLightYellow,
      };
    case Severity.warning:
      return {
        icon: colorPalette.lightRed,
        background: colorPalette.veryLightRed,
      };
    default:
      return {
        icon: colorPalette.mintGreen2,
        background: colorPalette.veryLightGreen,
      };
  }
};
