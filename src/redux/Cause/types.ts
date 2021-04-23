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
  quickActions?: QuickAction[];
} & InCreationCause;

interface Author {
  first_name: string;
  last_name_initial: string;
  last_name?: string;
  uuid: string;
}

interface Coalition {
  name: string;
  uuid: string;
}

export interface QuickAction {
  id?: string;
  label: string;
  link: string;
}
