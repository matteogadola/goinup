import { create, createStore, StateCreator } from 'zustand';

type LoginProvider = 'email' | 'google' | 'facebook' | null

export interface UiState {
  sidenavOpened: boolean
  loginLoading: boolean
  loginProvider: LoginProvider
}

export type UiActions = {
  sidenavToggle: () => void
  setLoginProvider: (provider: LoginProvider) => void
}

export type UiStore = UiState & UiActions

export const initUiStore = (): UiState => {
  return {
    sidenavOpened: false,
    loginLoading: false,
    loginProvider: null,
  }
}

export const defaultInitState: UiState = {
  sidenavOpened: false,
  loginLoading: false,
  loginProvider: null,
}

export const createUiStore = (
  initState: UiState = defaultInitState,
) => {
  return createStore<UiStore>()((set) => ({
    ...initState,
    sidenavToggle: () => set((state) => ({ sidenavOpened: !state.sidenavOpened })),
    setLoginProvider: (provider) => set((state) => ({ loginProvider: provider, loginLoading: provider !== null })),
  }))
}

export const useUiStore = create<UiStore>((set) => ({
  sidenavOpened: false,
  loginLoading: false,
  loginProvider: null,
  sidenavToggle: () => set((state) => ({ sidenavOpened: !state.sidenavOpened })),
  setLoginProvider: (provider) => set((state) => ({ loginProvider: provider, loginLoading: provider !== null })),
}))