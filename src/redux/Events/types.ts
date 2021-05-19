export type EventMode = 'meeting' | 'online';

export interface InCreationEventType {
  mode: EventMode;
  name: string;
  begin_at: string;
  finish_at: string;
  category: {
    name: string;
  };
  time_zone: string;
  description?: string;
  organizer?: {
    first_name: string;
    last_name: string;
  };
  participants_count?: number;
  post_address?: {
    address: string;
    postal_code: string;
    city_name: string;
    country: string;
  };
  visio_url?: string;
}

export type EventType = {
  uuid: string;
} & InCreationEventType;
