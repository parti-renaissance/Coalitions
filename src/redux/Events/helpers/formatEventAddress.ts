import { EventType } from '../types';

export const formatEventAddress = (event: EventType) => {
  if (event.postAddress === undefined) {
    return '';
  }

  const {
    address,
    city: { name },
    postalCode,
  } = event.postAddress;
  return `${address}, ${postalCode} ${name}`;
};
