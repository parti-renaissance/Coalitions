export interface InCreationCauseWithoutAuthor {
  coalition?: Coalition | null;
  name: string;
  description?: string;
  image_url: string;
  followers_count: number;
  supported?: boolean;
}

export type InCreationCause = InCreationCauseWithoutAuthor & {
  author?: Author | null;
};

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
