export interface EventType {
  uuid: string;
  begin_at: Date;
  finish_at: Date;
  capacity: number;
  category: {
    event_group_category: {
      name: string;
    };
  };
  mode: 'meeting' | 'online';
  name: string;
  time_zone: string; // ?
}

// begin_at: '1016-12-24T10:00:00+00:09';
// capacity: 10;
// category: event_group_category: name: 'Atelier';
// slug: 'atelier';
// __proto__: Object;
// name: 'Tractage';
// slug: 'tractage';
// __proto__: Object;
// finish_at: '2016-12-24T12:00:00+01:00';
// image_url: null;
// local_finish_at: '2016-12-24T12:00:00+01:00';
// mode: 'meeting';
// name: 'Où est mon bureau de vote ? 2';
// time_zone: 'Europe/Paris';
// user_registered_at: null;
// uuid: 'c44a1a3b-a24e-5c78-9dac-4137699c0d00';
