export interface Cause {
  author: Author;
  coalition: Coalition;
  name: string;
  description: string;
  uuid: string;
  image_url: string;
}

interface Author {
  first_name: string;
  last_name_initial: string;
  uuid: string;
}

interface Coalition {
  name: string;
  uuid: string;
}
