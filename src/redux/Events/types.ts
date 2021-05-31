export type EventMode = 'meeting' | 'online';

export type EventCategory = {
  uuid: string;
  name: string;
};

export interface CreateEventType {
  mode: EventMode;
  name: string;
  beginAt: string;
  finishAt: string;
  categoryId: string;
  timeZone: string;
  description: string;
  causeId: string;
  address: string;
  postalCode: string;
  cityName: string;
  country: string;
  visioUrl?: string;
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
    country: string;
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

export type RawEventCategory = {
  name: string;
};

export interface RawEventType {
  uuid: string;
  mode: EventMode | null;
  name: string;
  begin_at: string;
  finish_at: string;
  category: RawEventCategory;
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
    first_name: string;
    last_name: string;
  } | null;
}
