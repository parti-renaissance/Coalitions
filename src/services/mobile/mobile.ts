import { SMALL_DESKTOP_BREAK_POINT, TABLET_BREAK_POINT, DESKTOP_BREAK_POINT } from 'stylesheet';

export const getIsMobile = (): boolean => {
  return typeof window !== 'undefined' ? window.innerWidth < TABLET_BREAK_POINT : false;
};

export const getIsDesktop = (): boolean => {
  return typeof window !== 'undefined' ? window.innerWidth > SMALL_DESKTOP_BREAK_POINT : true;
};

export const getIsMediumDesktop = (): boolean => {
  return typeof window !== 'undefined' ? window.innerWidth > DESKTOP_BREAK_POINT : false;
};
