import { create, StateCreator } from 'zustand';
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

export interface CartStore {
  //isEmpty: boolean
  items: Item[]
  addItem: (item: Item) => void
}

interface Item {
  product_id: string;
  product_name: string;
  description: string;
  price: number;
  quantity: number;
  entry?: EntryForm;
  //isEmpty: boolean
  //items: any[]
  //setLoading: (action: string | null | undefined) => void
}

/*export const useCartStore: StateCreator<CartStore> = (set) => ({
  //isEmpty: true,
  items: [],
  addItem: (item) => set((store) => ({ ...store, item })),
})*/

// separati o uniti???

export const useCartStore = create<CartStore>((set) => ({
  //order: null,
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
}))