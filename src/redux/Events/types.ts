export type EventMode = 'meeting' | 'online';

export type EventCategory = {
  uuid: string;
  name: string;
};

export interface InCreationEventType {
  mode: EventMode;
  name: string;
  begin_at: string;
  finish_at: string;
  category: EventCategory;
  time_zone: string;
  description: string;
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
  participants_count: number;
  organizer: {
    first_name: string;
    last_name: string;
  };
  participate?: boolean;
} & InCreationEventType;
