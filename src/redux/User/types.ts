export interface User {
  uuid: string;
  firstName: string;
  lastName?: string;
  email: string;
  isAdherent: boolean;
  hasAcceptedCGU: boolean;
}
