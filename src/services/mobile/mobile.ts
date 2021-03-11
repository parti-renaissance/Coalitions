import { TABLET_BREAK_POINT } from 'stylesheet';

export const getIsMobile = (): boolean => {
  return window.innerWidth < TABLET_BREAK_POINT;
};
