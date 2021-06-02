export type EventMode = 'meeting' | 'online';

export type EventCategory = {
  slug: string;
  name: string;
};

export interface CreateEventType {
  mode: EventMode;
  name: string;
  beginAt: string;
  finishAt: string;
  categorySlug: string;
  timeZone: string;
  description: string;
  causeId: string;
  address: string;
  postalCode: string;
  countryCode: string;
  visioUrl?: string;
  cityName: string;
}

export type UpdatedEventType = {
  uuid: string;
} & CreateEventType;

export type EventType = {
  uuid: string;
  mode: EventMode;
  name: string;
  beginAt: string;
  finishAt: string;
  category: EventCategory;
  timeZone: string;
  description: string;
  causeId: string;
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
  } | null;
  visio_url: string | null;
  participants_count: number | null;
  organizer: {
    first_name: string;
    last_name: string;
  } | null;
}
