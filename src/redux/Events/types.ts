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
  time_zone: string;
}
