import { EventType } from '../types';

export const formatEventAddress = (event: EventType) => {
  if (event.postAddress === undefined) {
    return '';
  }

  const { address, cityName, postalCode } = event.postAddress;
  return `${address}, ${postalCode} ${cityName}`;
};
