export interface InCreationCause {
  author: Author;
  coalition: Coalition;
  name: string;
  description: string;
  image_url: string;
  followers_count: number;
  supported?: boolean;
}

export type Cause = {
  uuid: string;
} & InCreationCause;

interface Author {
  first_name: string;
  last_name_initial: string;
  uuid: string;
}

interface Coalition {
  name: string;
  uuid: string;
}
