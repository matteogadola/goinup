import { create, createStore, StateCreator } from 'zustand';
import { ssrExchange } from 'zustand/middleware'

import { EntryForm } from '@d/entries';
/*
interface CartState {
  isLoading: boolean
  loadingAction: string | null
  setLoading: (action: string | null | undefined) => void
}

export const useCartStore = create<CartState>()((set) => ({
  isLoading: false,
  loadingAction: null,
  setLoading: (action: string | null | undefined) => set(() => ({
    isLoading: !!action,
    loadingAction: action ?? null,
  })),
}))*/

export interface CartState {
  items: Item[]
  paymentMethod: string
}

export type CartActions = {
  addItem: (item: Item) => void
  removeItem: (index: number) => void
  setPaymentMethod: (paymentMethod: string) => void
}

export type CartStore = CartState & CartActions

/*export interface CartStore {
  //isEmpty: boolean
  items: Item[]
  paymentMethod: string
  addItem: (item: Item) => void
  removeItem: (index: number) => void
  setPaymentMethod: (paymentMethod: string) => void
}*/

export interface Item {
  product_id: string;
  product_name: string;
  description: string;
  price: number;
  quantity: number;
  payment_methods: string[];
  event_id: string;
  entry?: any;//EntryForm;
}

export const defaultInitState: CartState = {
  items: [],
  paymentMethod: 'stripe',
}

export const createCartStore = (
  initState: CartState = defaultInitState,
) => {
  return createStore<CartStore>()((set) => ({
    ...initState,
    addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    removeItem: (index) => set((state) => ({ items: state.items.toSpliced(index, 1) })),
    setPaymentMethod: (paymentMethod) => set(() => ({ paymentMethod })),
  }))
}


export const useCartStore = create<CartStore>((set) => ({
  items: [],
  paymentMethod: 'stripe',
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (index) => set((state) => ({ items: state.items.toSpliced(index, 1) })),
  setPaymentMethod: (paymentMethod) => set(() => ({ paymentMethod })),
}))