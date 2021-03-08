import { TABLET_BREAK_POINT } from 'stylesheet';

export function getIsMobile() {
  return window.innerWidth < TABLET_BREAK_POINT;
}
