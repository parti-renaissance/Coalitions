export interface InCreationCause {
  coalition?: Coalition | null;
  second_coalition?: Coalition | null;
  name: string;
  description?: string;
  image_url: string;
  followers_count: number;
  supported?: boolean;
  author?: Author | null;
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
