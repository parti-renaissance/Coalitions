import { EventType } from '../../redux/Events/types';

export const getEventHeaderTitle = (event: EventType) => {
  const nameParts = [];

  if (event.category !== undefined) {
    nameParts.push(event.category.name.toUpperCase());
  }

  if (event.coalition !== undefined) {
    nameParts.push(event.coalition.name);
  } else if (event.cause !== undefined) {
    nameParts.push(event.cause.coalition.name);
  }

  return nameParts.join(' • ');
};
