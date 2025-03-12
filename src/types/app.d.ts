import type { Session, SupabaseClient, User } from '@supabase/auth-helpers-nextjs';

export interface AppError {
  severity?: string;
  message: string;
}

export interface Auth {
  session: Session | null;
}

export interface NavLink {
  name: string;
  path: string;
  visible?: boolean;
}
