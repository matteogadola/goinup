import { create, StateCreator, StoreApi, UseBoundStore } from 'zustand';

type Provider = 'email' | 'google' | 'facebook' | 'strava'

interface AuthStore {
  isLoading: boolean
  loadingProvider: Provider | null
  error: Error | null
  setLoading: (provider?: Provider) => void
  setError: (error: Error) => void
}

/*export const useAuthStore = create<AuthState>()((set) => ({
  isLoading: false,
  loadingAction: null,
  setLoading: (action: string | null | undefined) => set(() => ({
    isLoading: !!action,
    loadingAction: action ?? null,
  })),
}))*/

export const createAuthSlice: StateCreator<AuthStore> = (set) => ({
  isLoading: false,
  loadingProvider: null,
  error: null,
  setLoading: (provider) => set(() => ({
    //isLoading: !!provider,
    loadingProvider: provider || null,
  })),
  setError: (message) => set(() => ({
    isLoading: false,
    loadingProvider: null,

  })),
})

export const useAuthStore = create<AuthStore>((set) => ({
  isLoading: false,
  loadingProvider: null,
  error: null,
  setLoading: (provider) => set(() => ({
    isLoading: !!provider,
    loadingProvider: provider || null,
  })),
  setError: (error) => set(() => ({
    isLoading: false,
    loadingProvider: null,
    error: error
  })),
}))
