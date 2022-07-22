export interface User {
  username: string;
  password?: string;
  email?: string;
  image?: string;
  firstName?: string;
  lastName?: string;
  companyId?: string;
  roles?: string[];
}
