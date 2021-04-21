export interface User {
  uuid: string;
  firstName: string;
  lastName?: string;
  email: string;
  gender?: string | null;
  birthdate?: string | null;
  phone?: string | null;
  isAdherent: boolean;
  hasAcceptedCGU: boolean;
}
