import type { Session, SupabaseClient, User } from '@supabase/auth-helpers-nextjs';
import type { Database } from './supabase';
import type { Auth } from './app';

export interface Store {
  appError: AppError | null;
  //supabase: SupabaseClient<Database>;
  //session: Session | null;
  //setSession: (session: Session | null) => void;
  //auth: Auth;
  //user: User | undefined;
  //setUser: (user: User | undefined) => void;
  //setAuthSession: (session: Session | null) => void;
  cartItems: OrderItem[];
  paymentMethod: PaymentMethod;
  setAppError: (error: AppError | null) => void;
  addCartItem: (item: OrderItem) => void;
  removeCartItem: (item: number) => void;
  clearCartItems: () => void;
  setPaymentMethod: (item: PaymentMethod) => void;
}
