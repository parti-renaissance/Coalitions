import { DESKTOP_BREAK_POINT, TABLET_BREAK_POINT } from 'stylesheet';

export const defineCtaPositionInList = (): number => {
  let ctaPosition = 3;

  if (typeof window !== 'undefined') {
    if (window.innerWidth > TABLET_BREAK_POINT) {
      ctaPosition = 6;
    }
    if (window.innerWidth > DESKTOP_BREAK_POINT) {
      ctaPosition = 12;
    }
  }

  return ctaPosition;
};
