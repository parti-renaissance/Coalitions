export interface Cause {
  author: Author;
  coalition: Coalition;
  name: string;
  description: string;
  uuid: string;
  image_url: string;
}

export interface Author {
  first_name: string;
  last_name_initial: string;
  uuid: string;
}

export interface Coalition {
  name: string;
  uuid: string;
}
