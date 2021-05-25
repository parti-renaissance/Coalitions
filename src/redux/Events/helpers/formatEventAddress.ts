import { EventType } from '../types';

export const formatEventAddress = (event: EventType) => {
  if (event.post_address === undefined) {
    return '';
  }

  const { address, city_name, postal_code } = event.post_address;
  return `${address}, ${postal_code} ${city_name}`;
};
