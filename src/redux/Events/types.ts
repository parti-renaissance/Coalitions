export interface InCreationEventType {
  begin_at: Date;
  finish_at: Date;
  capacity: number | null;
  category: {
    event_group_category: {
      name: string;
    };
  };
  mode: 'meeting' | 'online';
  name: string;
  time_zone: string;
  description?: string;
  organizer?: {
    first_name: string;
    last_name: string;
  };
  participants_count?: number;
  status?: string;
  post_address?: {
    address: string;
    postal_code: string;
    city: string;
    city_name: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  visio_url: string | null;
}

export type EventType = {
  uuid: string;
} & InCreationEventType;
