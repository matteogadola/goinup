import { create, createStore, StateCreator } from 'zustand';

export interface UiState {
  sidenavOpened: boolean
}

export type UiActions = {
  sidenavToggle: () => void
}

export type UiStore = UiState & UiActions

export const initUiStore = (): UiState => {
  return {
    sidenavOpened: false,
  }
}

export const defaultInitState: UiState = {
  sidenavOpened: false,
}

export const createUiStore = (
  initState: UiState = defaultInitState,
) => {
  return createStore<UiStore>()((set) => ({
    ...initState,
    sidenavToggle: () => set((state) => ({ sidenavOpened: !state.sidenavOpened })),
  }))
}

export const useUiStore = create<UiStore>((set) => ({
  sidenavOpened: false,
  sidenavToggle: () => set((state) => ({ sidenavOpened: !state.sidenavOpened })),
}))