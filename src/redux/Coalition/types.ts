export interface Coalition {
  name: string;
  description: string;
  uuid: string;
  image_url: string;
  filtered_by?: boolean;
  youtube_id?: string | null;
  followed?: boolean;
  cause_followers_count: number;
}
