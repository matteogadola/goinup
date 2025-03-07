import { Store } from '@/types/store';
import { create } from 'zustand';

interface Stepper {}

export const useStore = create<Store>((set) => ({
  appError: null,
  //auth: { session: null },
  //user: undefined,
  //session: null,
  //setSession: (session) => set((state) => ({ ...state, session })),
  //stepper: undefined,
  cartItems: [],
  paymentMethod: 'stripe',
  setAppError: (error) => set((state) => ({ ...state, error })),
  addCartItem: (item) => set((state) => ({ cartItems: [...state.cartItems, item] })),
  removeCartItem: (itemIndex) =>
    set((state) => ({ ...state, cartItems: state.cartItems.filter((item, index) => index !== itemIndex) })),
  clearCartItems: () => set((state) => ({ ...state, cartItems: [] })),
  setPaymentMethod: (item) => set((state) => ({ ...state, paymentMethod: item })),
}));
