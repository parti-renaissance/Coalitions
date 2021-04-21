export interface Coalition {
  name: string;
  description: string;
  uuid: string;
  followers_count: number;
  image_url: string;
  filtered_by?: boolean;
  youtube_id?: string | null;
}
