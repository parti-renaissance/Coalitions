export type EventMode = 'meeting' | 'online';

export type EventCategory = {
  slug: string;
  name: string;
};

export interface RawCreateEventType {
  type: 'cause' | 'coalition';
  name: string;
  description: string;
  time_zone: string;
  begin_at: string;
  finish_at: string;
  category: string;
  mode: EventMode;
  visio_url?: string;
  post_address: {
    address: string;
    postal_code: string;
    city_name: string;
    country: string;
  };
  causes?: string[];
  coalitions?: string[];
}

export type RawUpdateEventType = {
  uuid: string;
} & RawCreateEventType;

export type EventType = {
  uuid: string;
  mode: EventMode;
  name: string;
  beginAt: string;
  finishAt: string;
  category: EventCategory;
  timeZone: string;
  description: string;
  postAddress?: {
    address: string;
    postalCode: string;
    cityName: string;
    countryCode: string;
  };
  visioUrl?: string;
  numberOfParticipants: number;
  organizer?: {
    uuid: string;
    firstName: string;
    lastName: string;
  };
  participate?: boolean;
  cause?: {
    uuid: string;
    name: string;
    slug: string;
  };
  coalition?: {
    uuid: string;
    name: string;
  };
};

export interface RawEventType {
  uuid: string;
  mode: EventMode | null;
  name: string;
  begin_at: string;
  finish_at: string;
  category: EventCategory;
  time_zone: string;
  description: string;
  post_address: {
    address: string;
    postal_code: string;
    city_name: string;
    country: string;
  } | null;
  visio_url: string | null;
  participants_count: number | null;
  organizer: {
    uuid: string;
    first_name: string;
    last_name: string;
  } | null;
  cause?: {
    uuid: string;
    name: string;
    slug: string;
    coalition: {
      uuid: string;
      name: string;
    };
  };
  coalition?: {
    uuid: string;
    name: string;
  };
}
