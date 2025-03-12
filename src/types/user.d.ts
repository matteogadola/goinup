export interface User {
  id: string;
  name: string;
  logo: string | null;
  stripe_account: string | null;
}

export type Role = 'owner' | 'admin' | 'manager' | 'contributor' | 'viewer'
