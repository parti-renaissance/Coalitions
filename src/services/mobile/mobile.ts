import { SMALL_DESKTOP_BREAK_POINT, TABLET_BREAK_POINT } from 'stylesheet';

export const getIsMobile = (): boolean => {
  return window.innerWidth < TABLET_BREAK_POINT;
};

export const getIsDesktop = (): boolean => {
  return window.innerWidth > SMALL_DESKTOP_BREAK_POINT;
};
